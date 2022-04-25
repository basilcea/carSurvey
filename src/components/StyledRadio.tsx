import styled from "styled-components";
import { IChange} from "../types";
import { Container, Label } from "../shared";
import { useContext } from "react";
import { SurveyContext } from "../state/surveyState";

export default function StyledRadio({onChange}: IChange) {
    const {
        state: {
        formData,
          questions: {
            currentQuestion: {  name, options },
          },
        },
      } = useContext(SurveyContext);
  return (
    <RadioContainer>
      {options && options.map((option: string) => {
          return (
            <RadioOption key={option}>
              <div>
                <StyledInput
                  type="radio"
                  name={name}
                  value={option}
                  onChange={onChange}
                  checked={formData[name] === option}
                />
              </div>
              <Label>{option}</Label>
            </RadioOption>
          );
        })}
    </RadioContainer>
  );
}

const RadioContainer = styled(Container)`
  width: 100%;
  height: 70%;
  flex-direction: row;
  margin: 3% 0%;
  flex-wrap: wrap;
`;

const RadioOption = styled.div`
  padding-right: 10%;
  margin: 1% 0%;
  display: flex;
  align-items: center;
  font-size: 1rem;
`;



const StyledInput = styled.input`
  margin: ${(props) => (props.type === "radio" ? "0 10px" : "1% 0%")};
  margin-left: ${(props) => props.type === "radio" && 0};
  width: ${(props) => (props.type === "radio" ? "30px" : "50%")};
  height: 50px;
  border-radius: 10px;
  padding: ${(props) => (props.type === "radio" ? 0 : "1%")};
  font-size: 1.3rem;
`;
