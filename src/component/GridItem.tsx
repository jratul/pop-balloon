import styled from "@emotion/styled";
import { useState } from "react";

const Container = styled.div`
  width: 100px;
  height: 100px;
  background-color: #fbfafc;
  cursor: pointer;
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
  const [phase, setPhase] = useState<number>(0);
  const popBalloon = () => {
    setPhase(1);

    setTimeout(() => setPhase(2), 500);
  };

  return (
    <Container onClick={popBalloon}>
      {phase === 0 && <Image src="/image/balloon.png" alt="balloon" />}
      {phase === 1 && <Image src="/image/pop.gif" alt="balloon" />}
    </Container>
  );
}
