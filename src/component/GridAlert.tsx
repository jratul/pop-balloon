import styled from "@emotion/styled";
import Confetti from "react-confetti";
import Alert from "./Alert";

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

interface Props {
  handleButtonClick: () => void;
}

export function ClearAlert({ handleButtonClick }: Props) {
  return (
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
        handleButtonClick={handleButtonClick}
      />
      <Confetti />
    </>
  );
}

export function FailAlert({ handleButtonClick }: Props) {
  return (
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
      handleButtonClick={handleButtonClick}
    />
  );
}
