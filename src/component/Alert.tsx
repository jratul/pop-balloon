import styled from "@emotion/styled";
import Button from "./Button";
import Dimmed from "./Dimmed";
import ModalContainer from "./ModalContainer";

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: center;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface Props {
  title: string;
  content: React.ReactNode;
  buttonLabel: string;
  handleButtonClick: () => void;
}

export default function Alert({
  title,
  content,
  buttonLabel,
  handleButtonClick,
}: Props) {
  if (!open) {
    return null;
  }

  return (
    <Dimmed>
      <ModalContainer>
        <Title>{title}</Title>
        {content && <div>{content}</div>}
        <Bottom>
          <Button onClick={handleButtonClick}>{buttonLabel}</Button>
        </Bottom>
      </ModalContainer>
    </Dimmed>
  );
}
