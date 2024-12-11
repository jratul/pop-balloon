import { useEffect } from "react";
import Confetti from "react-confetti";
import styled from "@emotion/styled";
import { Pos } from "@model/model";
import useGrid from "@hook/useGrid";
import { useLoadingStore } from "@store/useLoadingStore";
import GridItem from "./GridItem";
import Button from "./Button";
import Highlight from "./Highlight";
import Loading from "./Loading";
import Alert from "./Alert";

const Topper = styled.div`
  display: flex;
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

const AlertContent = styled.div`
  width: 200px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const ClearContainer = styled.div`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

export default function Grid() {
  const { loading } = useLoadingStore();
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
        <>
          <Alert
            title="Clear!"
            content={
              <AlertContent>
                <ClearContainer>
                  <img src="/image/clear.svg" alt="clear" />
                </ClearContainer>
                이겼습니다!
              </AlertContent>
            }
            buttonLabel="다시하기"
            handleButtonClick={() => resetBalloons(size)}
          />
          <Confetti />
        </>
      )}
      {failed && (
        <Alert
          title="Failed..."
          content={
            <AlertContent>
              <ClearContainer>
                <img src="/image/cry.svg" alt="clear" />
              </ClearContainer>
              패배했습니다
            </AlertContent>
          }
          buttonLabel="다시하기"
          handleButtonClick={() => resetBalloons(size)}
        />
      )}
      <h1>
        <Highlight>P</Highlight>op <Highlight>B</Highlight>alloon
      </h1>
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
