import { useEffect } from "react";
import styled from "@emotion/styled";
import { Pos } from "@model/model";
import useGrid from "@hook/useGrid";
import GridItem from "./GridItem";
import Highlight from "./Highlight";
import Loading from "./Loading";
import { ClearAlert, FailAlert } from "./GridAlert";
import ToolBox from "./ToolBox";

const Title = styled.h1`
  text-align: center;
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
  const { size, balloons, maxCount, popBalloon, resetBalloons, failed } =
    useGrid();

  const arr = Array.from(Array(size.height), () => Array(size.width).fill(0));

  const handleClick = ({ y, x }: Pos) => {
    popBalloon({ y, x });
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
      <ToolBox resetBalloons={resetBalloons} />
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
