import { useState } from "react";
import { Balloons, Pos, Size } from "@model/model";
import { defaultSizeValue } from "src/constant";
import { useLoadingStore } from "@store/useLoadingStore";

const getPosList = ({ y, x }: Pos): Pos[] => {
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

  let maxCount = Math.max(
    ...Object.values(balloons ?? {}).flatMap(inner => Object.values(inner)),
  );

  if (!Number.isFinite(maxCount)) maxCount = 0;

  const isValidTry = ({ y, x }: Pos) => {
    return balloons?.[y]?.[x] === maxCount;
  };

  const doPop = ({ y, x }: Pos) => {
    const newBalloons = { ...balloons };
    [...getPosList({ y, x }), { y, x }].map(({ y, x }) => {
      delete newBalloons?.[y]?.[x];
    });

    return calBalloons(newBalloons);
  };

  const popBalloon = (pos: Pos) => {
    setBallons(doPop(pos));
  };

  const calBalloons = (balloons: Balloons) => {
    Object.entries(balloons).map(([centerY, inner]) => {
      Object.keys(inner).map(centerX => {
        balloons[centerY][centerX] = 1;
        getPosList({ y: Number(centerY), x: Number(centerX) }).map(
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
    setLoading(false);
  };

  return {
    size,
    setSize,
    balloons,
    maxCount,
    isValidTry,
    popBalloon,
    resetBalloons,
  };
}

export default useGrid;
