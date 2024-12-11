import styled from "@emotion/styled";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fef2f2cc;
`;

export default function Loading() {
  return (
    <Container>
      <span className="loader"></span>
    </Container>
  );
}
