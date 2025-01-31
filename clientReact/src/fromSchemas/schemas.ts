import * as yup from "yup";
const Regex = /^\s*[^,\s]+(\s*,\s*[^,\s]+)*\s*$/;
const schemaRecipe = yup
  .object({
    title: yup.string().required().typeError("Title is required"),
    description: yup.string().required().typeError("Description is required"),
    instructions: yup
      .string()
      .required()
      .min(5)
      .typeError("Instructions is required"),
    ingredients: yup
      .string()
      .matches(Regex, "Ingredients must be separated by ,")
      .required()
      .typeError("Ingredients is required"),
  })
  .required();

export default schemaRecipe;
