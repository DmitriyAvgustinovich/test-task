import { Field } from "@chakra-ui/react";
import { ReactNode } from "react";

interface FormFieldProps {
  name?: string;
  label?: string;
  children: ReactNode;
  error?: string;
}

export const FormField = ({ label, children, error }: FormFieldProps) => {
  return (
    <Field.Root invalid={!!error}>
      {label && <Field.Label>{label}</Field.Label>}
      {children}
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
};
