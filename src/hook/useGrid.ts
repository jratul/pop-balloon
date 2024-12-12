import { useState } from "react";
import { Balloons, Pos, Size } from "@model/model";
import { useLoadingStore } from "@store/useLoadingStore";
import { defaultSizeValue } from "src/constant";

const getTargetPosList = ({ y, x }: Pos): Pos[] => {
  return [
    { y: y - 1, x: x },
    { y: y, x: x - 1 },
    { y: y, x: x + 1 },
    { y: y + 1, x: x },
  ];
};

function useGrid() {
  const { setLoading } = useLoadingStore();
  const [size, setSize] = useState<Size>({
    height: defaultSizeValue,
    width: defaultSizeValue,
  });

  const [balloons, setBallons] = useState<Balloons>();
  const [failed, setFailed] = useState<boolean>(false);

  let maxCount = Math.max(
    ...Object.values(balloons ?? {}).flatMap(inner => Object.values(inner)),
  );

  if (!Number.isFinite(maxCount)) maxCount = 0;

  const isValidTry = ({ y, x }: Pos) => {
    return balloons?.[y]?.[x] === maxCount;
  };

  const doPop = ({ y, x }: Pos) => {
    const newBalloons = { ...balloons };
    [...getTargetPosList({ y, x }), { y, x }].map(({ y, x }) => {
      delete newBalloons?.[y]?.[x];
    });

    return calBalloons(newBalloons);
  };

  const popBalloon = (pos: Pos) => {
    if (!isValidTry(pos)) {
      setFailed(true);
      return;
    }

    setBallons(doPop(pos));
  };

  const calBalloons = (balloons: Balloons) => {
    Object.entries(balloons).map(([centerY, inner]) => {
      Object.keys(inner).map(centerX => {
        balloons[centerY][centerX] = 1;
        getTargetPosList({ y: Number(centerY), x: Number(centerX) }).map(
          ({ y, x }) => {
            if (balloons?.[y]?.[x] > 0) {
              balloons[centerY][centerX]++;
            }
          },
        );
      });
    });

    return balloons;
  };

  const resetBalloons = ({ height, width }: Size) => {
    setFailed(false);
    setLoading(true);
    const newBalloons: Balloons = {};
    for (let i = 0; i < height; ++i) {
      for (let j = 0; j < width; ++j) {
        if (Math.random() > 0.5) {
          if (!(i in newBalloons)) {
            newBalloons[i] = {};
          }
          newBalloons[i][j] = 1;
        }
      }
    }

    setBallons(calBalloons(newBalloons));
    setSize({ height, width });
    setLoading(false);
  };

  return {
    size,
    setSize,
    balloons,
    maxCount,
    popBalloon,
    resetBalloons,
    failed,
  };
}

export default useGrid;
