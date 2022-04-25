import Questions from "./../questions";
import { ICarType,  ISurveyState } from "./../types";
import { createContext, MouseEventHandler } from "react";
import { dispatchType, ISurvey } from "../types";
const initialState = {
  formData: {
    age: "",
    gender: "",
    license: "",
    firstCar: "",
    driveTrain: "",
    fuelEmissionsWorries: "",
    numberOfCars: "",
    carType: {}
  } as ISurveyState,
  end: false,
  disabled: false,
  error: "",
  questions: {
    prevQuestion: null,
    currentQuestion: Questions[0],
    nextQuestion: Questions[1],
    questionNumber: 0,
    lastQuestion: Questions.length - 1,
  },
};
export const survey = {
  state: initialState,
  dispatch: (defaultType: dispatchType): void => {},
};

export const surveyReducer = (
  state: ISurvey,
  action: dispatchType
): ISurvey => {
  switch (action.type) {
    case "SUCCESS":
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };
    case "TERMINATE":
      return {
        ...state,
        end: true,
      };
    case "RESTART":
      return {
        ...state,
        ...initialState,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
        disabled: true,
      };

    case "MOVE":
      return {
        ...state,
        questions: action.payload,
      };
    case "CLEAR":
      return {
        ...state,
        error:"",
        disabled: false,
      };

    default:
      return state;
  }
};

export const SurveyContext = createContext(survey);
