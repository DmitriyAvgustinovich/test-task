export const validationMessages = {
  required: "Поле обязательно для заполнения",
  min: (min: number) => `Значение не может быть меньше ${min}`,
  max: (max: number) => `Значение не может быть больше ${max}`,
} as const;
