import styled from "@emotion/styled";
import { Pos } from "@model/model";
import useGrid from "@hook/useGrid";
import GridItem from "./GridItem";
import { useLoadingStore } from "@store/loadingStore";
import { useEffect } from "react";
import Button from "./Button";

const Topper = styled.div`
  display: flex;
  margin-bottom: 4px;
`;

const Container = styled.div`
  width: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Row = styled.div`
  width: auto;
  display: flex;
  gap: 4px;
`;

export default function Grid() {
  const { loading } = useLoadingStore();
  const { size, balloons, maxCount, isValidTry, popBalloon, resetBalloons } =
    useGrid();

  const arr = Array.from(Array(size.height), () => Array(size.width).fill(0));

  const handleClick = ({ y, x }: Pos) => {
    if (!isValidTry({ y, x })) {
      alert("game over");
      return;
    }

    popBalloon({ y, x });
  };

  console.log(balloons);

  useEffect(() => {
    resetBalloons(size);
  }, []);

  if (Object.keys(balloons).length === 0) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>Pop Balloon</h1>
      <Topper>
        <Button disabled={loading} onClick={() => resetBalloons(size)}>
          Reset
        </Button>
      </Topper>
      <Container>
        {arr.map((row, y) => (
          <Row key={y}>
            {row.map((_, x) => (
              <GridItem
                key={x}
                balloonCount={balloons?.[y]?.[x] ?? 0}
                handleClick={() => handleClick({ y, x })}
              />
            ))}
          </Row>
        ))}
      </Container>
    </div>
  );
}
