import WithLogoBackground from "../WithLogoBackgroundHoc";
import styled from "styled-components";
import {Container,StyledLink, Label } from "../shared";
const NotFound = () => {
  return (
    <NotFoundContainer>
    <h1>404</h1>
      <Label> Page Not Found </Label>
      <p style={{fontSize: "1.2rem"}}> The page you are looking for does not exist or might have been removed </p>
      <StyledLink to='/' > Home </StyledLink>
    </NotFoundContainer>
  );
};

export default WithLogoBackground(NotFound);

const NotFoundContainer = styled(Container)`
  justify-content: center;
  align-items: center;
  height: 60vh;
  width: 100%;
`;

const Text = styled.p`
  font-size: 3em;
  color: blue;
`;
