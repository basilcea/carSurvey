import * as yup from "yup";

export const AgeSchema = yup.number()
  .typeError("Age must be a number")
  .required("Age is required")
  .positive("Age must be a positive")
  .integer("Age must be a integer")
  .min(0, "Age must be greater than or equal to 0")
  .max(100, "Age must be less than or equal to 100");

  export const NumberCarsSchema = yup.number()
  .typeError("Value must be a number")
  .required("Number of cars is required")
  .positive("Number of cars must be positive")
  .integer("Number of cars must be a integer")
  .min(1, "Age must be greater than or equal to 0")
  
//   export const MakeModelSchema = 
// yup.string().required("A Car Make Not Selected"),
//       carModel: yup.string().required("A Car Model Not Provided").when("carMake", ([carMake], schema) => {
//         return carMake === "BMW" && schema.matches(/^([M][0-9]{3}[Di]$)|(^[XZ][0-9]{1}$)/i, "BMW Pattern Mismatch")
//       })
//     })

export const  NotEmpty = yup.string().required("No Value Selected");


