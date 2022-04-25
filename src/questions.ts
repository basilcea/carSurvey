import { IQuestionInfo } from "./types";
import {AgeSchema, NotEmpty, NumberCarsSchema} from "./validationSchema";

export const Questions: IQuestionInfo[] = [

      {
        name: "age",
        question: "How old are you?",
        inputType: "number",
        schema: AgeSchema,
      },
      {
        name: "gender",
        question: "What's your gender?",
        inputType: "dropdown",
        options: ["-- Select Gender --", "Male", "Female", "Other"],
  
        schema: NotEmpty,
      },


      {
        name: "license",
        question: "Do you own a car driving license?",
        inputType: "radio",
        options: ["Yes", "No, I prefer using other transport"],
  
        schema: NotEmpty,
      },

      {
        name: "firstCar",
        question: "Is this your first car?",
        inputType: "radio",
        options: ["Yes", "No"],
   
        schema: NotEmpty,
      },
      {
        name: "driveTrain",
        question: "Which drivetrain do you prefer?",
        inputType: "radio",
        options: ["FWD", "RWD", "I don't know"],
        canSkip: false,
        schema: NotEmpty,
      },
      {
        name: "fuelEmissionsWorries",
        question: "Are you worried about fuel emissions?",
        inputType: "radio",
        options: ["Yes", "No"],

        schema: NotEmpty,
      },
      {
        name: "numberOfCars",
        question: "How many cars do you have in your family?",
        inputType: "number",
        schema: NumberCarsSchema ,
      }

  
];
export default Questions