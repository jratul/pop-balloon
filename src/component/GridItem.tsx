import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useLoadingStore } from "@store/loadingStore";

interface Props {
  balloonCount: number;
  handleClick: () => void;
}

interface ContainerProps {
  disabled: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 100px;
  aspect-ratio: 1/1;
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

export default function GridItem({ balloonCount, handleClick }: Props) {
  const { loading, setLoading } = useLoadingStore();
  const [phase, setPhase] = useState<number>(0);

  let timeout: number = 0;

  const popBalloon = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    setPhase(1);

    timeout = setTimeout(() => {
      setPhase(2);
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    if (loading) {
      return;
    }

    if (balloonCount === 0) {
      popBalloon();
    } else {
      setPhase(0);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [balloonCount]);

  return (
    <Container onClick={handleClick} disabled={loading}>
      {phase === 0 && <Image src="/image/balloon.png" alt="balloon" />}
      {phase === 1 && <Image src="/image/pop.gif" alt="balloon" />}
    </Container>
  );
}
