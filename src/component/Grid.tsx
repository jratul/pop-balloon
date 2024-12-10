import styled from "@emotion/styled";
import GridItem from "./GridItem";

const size = 20;

const arr = Array.from(Array(size), () => Array(size).fill(0));

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Row = styled.div`
  display: flex;
  gap: 4px;
`;

export default function Grid() {
  return (
    <div>
      <Container>
        {arr.map((row, y) => (
          <Row key={y}>
            {row.map((_, x) => (
              <GridItem key={x} />
            ))}
          </Row>
        ))}
      </Container>
    </div>
  );
}
