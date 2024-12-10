import styled from "@emotion/styled";
import Grid from "@component/Grid";

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 12px;
`;

function App() {
  return (
    <Container>
      <Grid />
    </Container>
  );
}

export default App;
