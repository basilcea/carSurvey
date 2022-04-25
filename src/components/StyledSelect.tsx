import { useContext } from "react";
import styled from "styled-components";
import { SurveyContext } from "../state/surveyState";
import { IChange } from "../types";

export default function Select({onChange, inputName, defaultVal }: IChange) {
  const {
    state: {
      questions: {
        currentQuestion: { options },
      },
    },
  } = useContext(SurveyContext);
  
  return (
    <StyledSelect
      name={inputName}
      onChange={onChange}
      defaultValue={ defaultVal || (options && options[0])}
    >
      {options &&
        options.map((option, i) => {
          return (
            <Option
              key={option}
              disabled={i === 0}
              hidden={i === 0}
            >
              {option}
            </Option>
          );
        })}
    </StyledSelect>
  );
}

const StyledSelect = styled.select`
  width: 55%;
  height: 60px;
  border-radius: 10px;
  padding: 1rem;
  display: block;
  font-size: 1.2rem;
  margin-top: 3%;
  padding-right: 2rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='50' viewBox='0 0 24 24' width='50' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 5px;
  z-index: 999;
`;

const Option = styled.option`
  margin-top: 5%;
`;
