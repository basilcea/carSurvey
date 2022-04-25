import { MouseEventHandler, useContext, useState } from "react";
import styled from "styled-components";
import { Container, Label } from "../shared";
import { SurveyContext } from "../state/surveyState";
import { checkSkip } from "../utils/helper";
import { StyledRadio, StyledInput, StyledSelect } from "../components";
import WithLogoBackground from "../WithLogoBackgroundHoc";
import { ISurveyState } from "../types";
import { StyledLink } from "../shared";

const Survey = () => {
  const {
    state: { formData, end, questions, error, disabled },
    dispatch,
  } = useContext(SurveyContext);
  const { age, gender, license, firstCar, carMake, carModel, numberOfCars } =
    formData;
  const {
    currentQuestion,
    questionNumber,
    prevQuestion,
    nextQuestion,
    lastQuestion,
  } = questions;
  const { question, name, inputType, schema } = currentQuestion;
  const [onClick, setOnClick] = useState<MouseEventHandler<HTMLElement>>();

  const onChange = (e: any) => {
    dispatch({ type: "CLEAR" });
    const target = e.target;
    const name = target.name;
    const value = parseInt(target.value)
      ? target.value.replace(/^0+/, "")
      : target.value;
    dispatch({ type: "SUCCESS", payload: { [name]: value } });
  };

  const checkEndConditions = () => {
    if (
      (Number(age) < 18 && gender && questionNumber === 1) ||
      (license && license !== "Yes" && questionNumber === 2) ||
      (firstCar && firstCar === "Yes") ||
      questionNumber === lastQuestion ||
      (numberOfCars &&
        carMake?.length === numberOfCars &&
        carModel?.length === numberOfCars)
    ) {
      dispatch({ type: "TERMINATE" });
      const savedString = localStorage.getItem("localSurveyData");
      if (savedString) {
        const val = JSON.parse(savedString) as ISurveyState[];
        val.push(formData);
        localStorage.setItem("localSurveyData", JSON.stringify(val));
      } else {
        localStorage.setItem("localSurveyData", JSON.stringify([formData]));
      }
      return false;
    }
    return true;
  };

  const onClickNext = async (name: string, schema?: any) => {
    try {
      dispatch({ type: "CLEAR" });
      schema && (await schema.validate(formData[name]));
      let check = checkEndConditions();
      check &&
        dispatch({
          type: "MOVE",
          payload: checkSkip("NEXT", questionNumber, age),
        });
    } catch (error: any) {
      dispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  const onClickPrev = () => {
    dispatch({ type: "CLEAR" });
    const moveAction = checkSkip("PREV", questionNumber, age);
    dispatch({ type: "MOVE", payload: moveAction });
  };
  return (
    <SurveyContainer>
      <Header> Car Sales Survey</Header>
      {!end ? (
        <QuestionContainer>
          <SubHeading>
            Please answer the questions below to help us get insight on car
            purchases
          </SubHeading>

          <InputContainer>
            <Label>{question}</Label>
            {inputType === "radio" ? (
              <StyledRadio onChange={onChange} />
            ) : inputType === "dropdown" ? (
              <StyledSelect
                onChange={onChange}
                defaultVal={formData[name]}
                inputName={name}
              />
            ) : (
              <StyledInput
                onChange={onChange}
                inputName={name}
                inputValue={formData[name]}
              />
            )}

            {error && <ErrorMessage>{error}</ErrorMessage>}
          </InputContainer>
          <Navigator>
            {prevQuestion && <Button onClick={onClickPrev}>Previous</Button>}
            {nextQuestion && (
              <Button
                onClick={(e) => (onClick && onClick(e)) || onClickNext(name, schema)}
                disabled={disabled}
              >
                Next
              </Button>
            )}
            {questionNumber === lastQuestion && (
              <Button
                onClick={(e) => (onClick && onClick(e)) || onClickNext(name, schema)}
                disabled={disabled}
              >
                Submit
              </Button>
            )}
          </Navigator>
        </QuestionContainer>
      ) : (
        <QuestionContainer>
          <Message>
            {firstCar === "Yes"
              ? "We are targeting more experienced clients, thank you for your interest."
              : "Your response has been saved. Thank you for filling this form."}
          </Message>
          <Navigator>
            <Button onClick={() => dispatch({ type: "RESTART" })}>Home</Button>
            <StyledLink
              onClick={() => dispatch({ type: "RESTART" })}
              to="/statistics"
            >
              {" "}
              Results Summary
            </StyledLink>
          </Navigator>
        </QuestionContainer>
      )}
    </SurveyContainer>
  );
};

export default WithLogoBackground(Survey);

const SurveyContainer = styled(Container)`
  display: flex;
  width: 100%;
  margin: 5% 0%;
  height: auto;
`;

const InputContainer = styled(Container)`
  margin-top: 3%;
  width: 100%;
  height: auto;
`;

const Navigator = styled(Container)`
  flex-direction: row;
  margin: 5% 0%;
  width: 100%;
  height: 15%;
`;
export const Button = styled.button`
  width: 25%;
  margin: 3% 0%;
  margin-right: 5%;
  height: 50px;
  font-size: 1rem;
  border-radius: 10px;
`;
const Header = styled.h2`
  font-size: 2em;
  width: 50%;
  margin: 0% 25%;
  color: blue;
`;
export const ErrorMessage = styled.p`
  color: red;
  font-size: 20px;
`;

const QuestionContainer = styled(Container)`
  width: 70%;
  margin: 0% 15%;
`;

const SubHeading = styled.h4`
  font-size: 1.4rem;
  width: 60%;
`;

const Message = styled.p`
  font-size: 1.5em;
`;
