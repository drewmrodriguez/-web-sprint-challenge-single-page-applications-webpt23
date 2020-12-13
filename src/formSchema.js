import * as yup from "yup";

export default yup.object().shape({
  name: yup.string().min(2, "Name must be at least 2 characters"),
  pizzaSize: yup
    .string()
    .oneOf(
      ["Small", "Medium", "Large", "Extra Large"],
      "Pizza size is required"
    ),
  olives: yup.boolean(),
  mushrooms: yup.boolean(),
  jalapenos: yup.boolean(),
  extraCheese: yup.boolean(),
  instructions: yup.string(),
});