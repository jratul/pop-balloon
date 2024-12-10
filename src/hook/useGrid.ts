import { useState } from "react";
import { Balloon, Pos, Size } from "@model/model";
import { defaultSizeValue } from "src/constant";
import { useLoadingStore } from "@store/loadingStore";

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

  const [balloons, setBallons] = useState<Balloon>({});

  let maxCount = Math.max(
    ...Object.values(balloons).flatMap(inner => Object.values(inner)),
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

    return newBalloons;
  };

  const popBalloon = (pos: Pos) => {
    setBallons(doPop(pos));
  };

  const resetBalloons = ({ height, width }: Size) => {
    setLoading(true);
    const newBalloons: Balloon = {};
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

    Object.entries(newBalloons).map(([centerY, inner]) => {
      Object.keys(inner).map(centerX => {
        getPosList({ y: Number(centerY), x: Number(centerX) }).map(
          ({ y, x }) => {
            if (newBalloons?.[y]?.[x] > 0) {
              newBalloons[centerY][centerX]++;
            }
          },
        );
      });
    });

    setBallons(newBalloons);
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
