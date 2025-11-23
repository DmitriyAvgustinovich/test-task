import * as Yup from "yup";
import { validationMessages } from "../utils/validationMessages";
import { moreThanSumOfFields } from "../utils/yupExtensions";

export interface PropertyFormValues {
  name: string;
  address: string;
  floor: number;
  totalFloors: number;
  square: number;
  livingSquare: number;
  kitchenSquare: number;
}

export const propertySchema = Yup.object().shape({
  name: Yup.string().required(validationMessages.required),
  address: Yup.string().required(validationMessages.required),

  floor: Yup.number()
    .required(validationMessages.required)
    .integer("Значение должно быть целым числом")
    .min(-1, validationMessages.min(-1))
    .test(
      "max-floor",
      function (this: Yup.TestContext, value: number | undefined) {
        const parent = this.parent;
        if (
          !parent ||
          typeof parent !== "object" ||
          !("totalFloors" in parent)
        ) {
          return true;
        }
        const totalFloors = parent.totalFloors;
        if (
          totalFloors === undefined ||
          totalFloors === null ||
          value === undefined
        ) {
          return true;
        }
        if (typeof totalFloors !== "number" || typeof value !== "number") {
          return true;
        }
        if (value > totalFloors) {
          return this.createError({
            message: validationMessages.max(totalFloors),
          });
        }
        return true;
      }
    ),

  totalFloors: Yup.number()
    .required(validationMessages.required)
    .integer("Значение должно быть целым числом")
    .min(-3, validationMessages.min(-3))
    .max(200, validationMessages.max(200)),

  square: Yup.number()
    .required(validationMessages.required)
    .integer("Значение должно быть целым числом")
    .min(0, validationMessages.min(0))
    .max(400, validationMessages.max(400))
    .test(
      moreThanSumOfFields(
        ["livingSquare", "kitchenSquare"],
        "Общая площадь должна быть больше суммы жилой площади и площади кухни"
      )
    ),

  livingSquare: Yup.number()
    .required(validationMessages.required)
    .integer("Значение должно быть целым числом")
    .min(0, validationMessages.min(0)),

  kitchenSquare: Yup.number()
    .required(validationMessages.required)
    .integer("Значение должно быть целым числом")
    .min(0, validationMessages.min(0)),
});
