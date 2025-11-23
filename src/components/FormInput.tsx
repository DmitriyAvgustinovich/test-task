import { Input } from "@chakra-ui/react";
import { useFormikField } from "../hooks/useFormikField";
import { FormField } from "./FormField";

interface FormInputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
}

export const FormInput = ({
  name,
  label,
  type = "text",
  placeholder,
}: FormInputProps) => {
  const { field, meta } = useFormikField<string>({ name });

  return (
    <FormField name={name} label={label} error={meta.error}>
      <Input {...field} type={type} placeholder={placeholder} width="100%" />
    </FormField>
  );
};
