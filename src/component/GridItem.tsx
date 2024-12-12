import { memo, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useLoadingStore } from "@store/useLoadingStore";

interface Props {
  balloonCount: number;
  onClick: () => void;
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

function GridItem({ balloonCount, onClick }: Props) {
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

  const handleClick = () => {
    if (loading || balloonCount === 0) {
      return;
    }

    onClick();
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
    <Container onClick={handleClick} disabled={loading || balloonCount === 0}>
      {phase === 0 && <Image src="/image/balloon.png" alt="balloon" />}
      {phase === 1 && <Image src="/image/pop.gif" alt="balloon" />}
    </Container>
  );
}

export default memo(GridItem);
