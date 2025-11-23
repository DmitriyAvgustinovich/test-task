import { RadioGroup } from "@chakra-ui/react";
import { useFormikField } from "../hooks/useFormikField";
import { FormField } from "./FormField";
import { ReactNode } from "react";

interface FormRadioGroupProps {
  name: string;
  label?: string;
  children?: ReactNode;
  options?: { value: string; label: string }[];
}

export const FormRadioGroup = ({
  name,
  label,
  children,
  options,
}: FormRadioGroupProps) => {
  const { field, meta, setValue } = useFormikField<string>({ name });

  return (
    <FormField name={name} label={label} error={meta.error}>
      <RadioGroup.Root
        value={field.value || ""}
        onValueChange={(details) => {
          setValue(details.value || "");
        }}
      >
        {options
          ? options.map((option, index) => (
              <RadioGroup.Item
                key={option.value}
                value={option.value}
                ml={index > 0 ? 4 : 0}
              >
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
              </RadioGroup.Item>
            ))
          : children}
      </RadioGroup.Root>
    </FormField>
  );
};
