import styled from "@emotion/styled";
import { useState } from "react";
import { useLoadingStore } from "src/store/loadingStore";

interface ContainerProps {
  disabled: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 100px;
  height: 100px;
  background-color: #fbfafc;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px #bfdbfe solid;
  border-radius: 4px;
  overflow: hidden;
`;

const Image = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

export default function GridItem() {
  const { loading, setLoading } = useLoadingStore();
  const [phase, setPhase] = useState<number>(0);
  const popBalloon = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    setPhase(1);

    setTimeout(() => {
      setPhase(2);
      setLoading(false);
    }, 500);
  };

  return (
    <Container onClick={popBalloon} disabled={loading}>
      {phase === 0 && <Image src="/image/balloon.png" alt="balloon" />}
      {phase === 1 && <Image src="/image/pop.gif" alt="balloon" />}
    </Container>
  );
}
