import styled from "@emotion/styled";
import Button from "./Button";
import Dimmed from "./Dimmed";

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  background-color: white;
  padding: 12px;
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1);
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
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
      <Container>
        <Title>{title}</Title>
        {content && <div>{content}</div>}
        <Bottom>
          <Button onClick={handleButtonClick}>{buttonLabel}</Button>
        </Bottom>
      </Container>
    </Dimmed>
  );
}
