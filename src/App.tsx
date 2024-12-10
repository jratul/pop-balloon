import styled from "@emotion/styled";
import Grid from "@component/Grid";

const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 12px;
`;

function App() {
  return (
    <Container>
      <h1>Pop Balloon</h1>
      <Grid />
    </Container>
  );
}

export default App;
