import { Component, FC } from "react";
import { Logo } from "./components";
import styled from "styled-components";
import { Container } from "./shared";

export default function WithLogoBackground(Wrapped: FC) {
  class NewPage extends Component {
    render() {
      return (
        <Page>
          <Logo />
          <Wrapped />
        </Page>
      );
    }
  }
  return NewPage;
}

const Page = styled(Container)`
  max-width: 2000px;

`;


