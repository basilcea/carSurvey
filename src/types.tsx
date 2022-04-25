import { ChangeEventHandler, FocusEventHandler } from "react";

export type dispatchType = {
  type: string;
  payload?: any;
};

export interface ISurveyState {
  age: string;
  gender?: string;
  license?: string;
  firstCar?: string;
  driveTrain?: string;
  fuelEmissionsWorries?: string;
  numberOfCars: string;
  carType: any;
  [index: string]: any;
}

export interface IQuestionInfo {
  question: string;
  name: string;
  inputType: string;
  options?: string[];
  schema?: any;
  [index: string]: any;
}

export interface ICarType {
  carMake : string,
  carModel: string,
  [index: string]: string
}

export interface ISurvey {
  formData: ISurveyState;
  error: string;
  end: boolean;
  disabled: boolean;
  questions: IQuestions;
}

export interface IQuestions {
  prevQuestion: any ;
  currentQuestion: any ;
  nextQuestion: any;
  questionNumber: number;
  lastQuestion: number;
  [index: number]: any
}

export interface IChange {
  onChange: ChangeEventHandler<HTMLElement> ,
  onBlur?: FocusEventHandler<HTMLElement>,
  defaultVal?: string,
  inputValue?: string
  inputName?: string
}

export interface ISurveyProps {
  survey: ISurveyState[];
  targetables?: number
}

export interface ILineLabel {
  x: number;
  y: number;
  fill: string;
  value: number;
}

export interface IPieLabel {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
 
}