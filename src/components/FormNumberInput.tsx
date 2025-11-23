import { NumberInput } from "@chakra-ui/react";
import { useFormikField } from "../hooks/useFormikField";
import { FormField } from "./FormField";

interface FormNumberInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
}

export const FormNumberInput = ({
  name,
  label,
  placeholder,
  min,
  max,
}: FormNumberInputProps) => {
  const { field, meta, setValue, setTouched } = useFormikField<
    number | undefined
  >({
    name,
  });

  return (
    <FormField name={name} label={label} error={meta.error}>
      <NumberInput.Root
        value={field.value?.toString() || ""}
        onValueChange={(details) => {
          const numValue = details.valueAsNumber;
          if (!isNaN(numValue)) {
            setValue(numValue);
          } else {
            setValue(undefined);
          }
        }}
        onBlur={() => setTouched(true)}
        min={min}
        max={max}
        width="100%"
      >
        <NumberInput.Input placeholder={placeholder} />
        <NumberInput.Control>
          <NumberInput.IncrementTrigger />
          <NumberInput.DecrementTrigger />
        </NumberInput.Control>
      </NumberInput.Root>
    </FormField>
  );
};
