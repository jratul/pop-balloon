import { useState } from "react";
import { Balloons, Pos, Size } from "@model/model";
import { useLoadingStore } from "@store/useLoadingStore";
import { defaultSizeValue } from "src/constant";

const getTargetPosList = ({ y, x }: Pos): Pos[] => {
  return [
    { y: y - 1, x },
    { y, x: x - 1 },
    { y, x: x + 1 },
    { y: y + 1, x },
  ];
};

const getAffectPosList = ({ y, x }: Pos): Pos[] => {
  return [
    { y: y - 2, x },
    { y: y - 1, x: x - 1 },
    { y: y - 1, x: x + 1 },
    { y, x: x - 2 },
    { y, x: x + 2 },
    { y: y + 1, x: x - 1 },
    { y: y + 1, x: x + 1 },
    { y: y + 2, x: x },
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

  const calOnePos = (balloons: Balloons, { y, x }: Pos) => {
    if (balloons?.[y]?.[x] > 0) {
      balloons[y][x] = getTargetPosList({ y, x }).reduce((acc, cur) => {
        if (balloons?.[cur.y]?.[cur.x] > 0) {
          return acc + 1;
        }
        return acc;
      }, 1);
    }
  };

  const doPop = (balloons: Balloons, { y, x }: Pos) => {
    const newBalloons = { ...balloons };
    [...getTargetPosList({ y, x }), { y, x }].map(({ y, x }) => {
      delete newBalloons?.[y]?.[x];
    });

    getAffectPosList({ y, x }).map(affectPos => {
      calOnePos(newBalloons, affectPos);
    });
  };

  const popBalloon = (pos: Pos) => {
    if (!isValidTry(pos)) {
      setFailed(true);
      return;
    }

    const newBalloons = { ...balloons };

    doPop(newBalloons, pos);

    setBallons(newBalloons);
  };

  const calBalloons = (balloons: Balloons) => {
    Object.entries(balloons).map(([centerY, inner]) => {
      Object.keys(inner).map(centerX => {
        calOnePos(balloons, { y: Number(centerY), x: Number(centerX) });
      });
    });
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

    calBalloons(newBalloons);

    setBallons(newBalloons);
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
