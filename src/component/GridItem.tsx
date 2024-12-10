import styled from "@emotion/styled";

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
  return (
    <Container>
      <Image src="/image/balloon.png" alt="balloon" />
    </Container>
  );
}
