import * as Yup from "yup";

export function moreThanSumOfFields(
  fields: string[],
  message?: string
): Yup.TestConfig<number | undefined, Yup.AnyObject> {
  return {
    message:
      message ||
      `Значение должно быть больше суммы полей: ${fields.join(", ")}`,
    test: function (value: number | undefined, context: Yup.TestContext) {
      if (value === undefined || value === null) {
        return true;
      }

      const parent = context.parent;

      const sum = fields.reduce((acc, fieldName) => {
        const fieldValue = parent?.[fieldName];
        const numValue = typeof fieldValue === "number" ? fieldValue : 0;

        return acc + numValue;
      }, 0);

      return value > sum;
    },
  };
}

declare module "yup" {
  interface NumberSchema {
    moreThanSumOfFields(fields: string[], message?: string): NumberSchema;
  }
}

Yup.addMethod<Yup.NumberSchema>(
  Yup.number,
  "moreThanSumOfFields",
  function (this: Yup.NumberSchema, fields: string[], message?: string) {
    return this.test(moreThanSumOfFields(fields, message));
  }
);
