import styled from "styled-components";
export default function Logo() {
  return (
    <Container>
      <Text>
        Sur<span style={{"color": "#051094"}}>veya</span>
      </Text>
    </Container>
  );
}

const Text = styled.p`
  font-size: 2em;
  font-weight: bold;
  color: blue ;
`;
const Container = styled.div`
  height: 10%;
  width: 90%;
  margin: 2% 5%;
`;
