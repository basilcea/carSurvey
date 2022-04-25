import styled from "styled-components";
import { useContext } from "react";
import { SurveyContext } from "../state/surveyState";
import { IChange } from "../types";


export default function Input({onChange, onBlur,  inputName, inputValue}: IChange) {
  const {
    state: {
      questions: {
        currentQuestion: { inputType},
      },
    },
  } = useContext(SurveyContext);
  return (
    <StyledInput
      type={inputType}
      name={inputName}
      value={inputValue}
      onChange={onChange}
      onBlur={onBlur}
      required
    />
  );
}

const StyledInput = styled.input`
  margin: ${(props) => (props.type === "radio" ? "0 10px" : "1% 0%")};
  margin-left: ${(props) => props.type === "radio" && 0};
  width: ${(props) => (props.type === "radio" ? "30px" : "50%")};
  height: 50px;
  border-radius: 10px;
  padding: ${(props) => (props.type === "radio" ? 0 : "1%")};
  font-size: 1.3rem;
`;
