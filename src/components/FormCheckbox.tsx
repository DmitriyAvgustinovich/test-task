import { Checkbox } from "@chakra-ui/react";
import { useFormikField } from "../hooks/useFormikField";
import { FormField } from "./FormField";
import { ReactNode } from "react";

interface FormCheckboxProps {
  name: string;
  label?: string;
  children?: ReactNode;
}

export const FormCheckbox = ({ name, label, children }: FormCheckboxProps) => {
  const { field, meta, setValue } = useFormikField<boolean>({ name });

  return (
    <FormField name={name} label={label} error={meta.error}>
      <Checkbox.Root
        checked={field.value || false}
        onCheckedChange={(details) => {
          setValue(details.checked === true);
        }}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Label>{children || label}</Checkbox.Label>
      </Checkbox.Root>
    </FormField>
  );
};
