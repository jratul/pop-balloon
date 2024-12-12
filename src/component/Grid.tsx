import { useEffect, useState } from "react";
import { Range } from "react-range";
import styled from "@emotion/styled";
import { Pos } from "@model/model";
import useGrid from "@hook/useGrid";
import { useLoadingStore } from "@store/useLoadingStore";
import GridItem from "./GridItem";
import Button from "./Button";
import Highlight from "./Highlight";
import Loading from "./Loading";
import { ClearAlert, FailAlert } from "./GridAlert";
import { defaultSizeValue, maxSizeValue } from "src/constant";

const Title = styled.h1`
  text-align: center;
`;

const Topper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
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

  const [inputSize, setInputSize] = useState<number>(defaultSizeValue);

  const arr = Array.from(Array(size.height), () => Array(size.width).fill(0));

  const handleClick = ({ y, x }: Pos) => {
    popBalloon({ y, x });
  };

  const handleReset = () => {
    resetBalloons({ height: inputSize, width: inputSize });
  };

  const handleInputSizeChange = (newValues: number[]) => {
    const newValue = newValues[0];
    if (newValue >= 1 && newValue <= maxSizeValue) {
      setInputSize(newValue);
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
        <Range
          min={1}
          max={10}
          step={1}
          values={[inputSize]}
          onChange={handleInputSizeChange}
          disabled={loading}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
                width: "200px",
                backgroundColor: "#fca5a5",
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              key={props.key}
              style={{
                ...props.style,
                height: "20px",
                width: "20px",
                borderRadius: "100%",
                backgroundColor: "#ef4444",
              }}
            />
          )}
        />
        <Button disabled={loading} onClick={handleReset}>
          <img src="/image/reset.svg" width={20} height={20} />
          다시하기({inputSize} x {inputSize})
        </Button>
      </Topper>
      <Container>
        {arr.map((row, y) => (
          <Row key={y}>
            {row.map((_, x) => (
              <GridItem
                key={x}
                balloonCount={balloons?.[y]?.[x] ?? 0}
                onClick={() => handleClick({ y, x })}
              />
            ))}
          </Row>
        ))}
      </Container>
    </div>
  );
}
