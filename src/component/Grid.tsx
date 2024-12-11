import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Pos } from "@model/model";
import useGrid from "@hook/useGrid";
import { useLoadingStore } from "@store/useLoadingStore";
import GridItem from "./GridItem";
import Button from "./Button";
import Highlight from "./Highlight";
import Loading from "./Loading";
import { ClearAlert, FailAlert } from "./GridAlert";

const Title = styled.h1`
  text-align: center;
`;

const Topper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
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
  justify-content: center;
  gap: 4px;
`;

export default function Grid() {
  const { loading } = useLoadingStore();
  const { size, balloons, maxCount, popBalloon, resetBalloons, failed } =
    useGrid();

  const sizeInputRef = useRef<HTMLInputElement>(null);

  const arr = Array.from(Array(size.height), () => Array(size.width).fill(0));

  const handleClick = ({ y, x }: Pos) => {
    popBalloon({ y, x });
  };

  const handleReset = () => {
    if (sizeInputRef?.current) {
      const value = parseInt(sizeInputRef?.current?.value) as number;
      resetBalloons({ height: value, width: value });
    }
  };

  useEffect(() => {
    resetBalloons(size);
  }, []);

  if (!balloons) {
    return <Loading />;
  }

  return (
    <div>
      {balloons && maxCount === 0 && (
        <ClearAlert handleButtonClick={() => resetBalloons(size)} />
      )}
      {failed && <FailAlert handleButtonClick={() => resetBalloons(size)} />}
      <Title>
        <Highlight>P</Highlight>op <Highlight>B</Highlight>alloon
      </Title>
      <Topper>
        <input
          type="number"
          min={1}
          max={10}
          step={1}
          defaultValue={size.width}
          ref={sizeInputRef}
        />
        <Button disabled={loading} onClick={handleReset}>
          <img src="/image/reset.svg" width={20} height={20} />
          다시하기
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
