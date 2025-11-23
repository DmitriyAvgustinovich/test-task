import { useField, useFormikContext } from "formik";
import { useMemo, useCallback } from "react";
import { FocusEvent } from "react";
import { validationMessages } from "../utils/validationMessages";

export interface UseFormikFieldOptions<T> {
  name: string;
  validate?: (value: T) => string | undefined;
}

export function useFormikField<T>(options: UseFormikFieldOptions<T>) {
  const { name, validate } = options;
  const [field, meta, helpers] = useField<T>({ name, validate });
  const formik = useFormikContext();

  type ChakraValueEvent = { value: T };
  type ChakraCheckedEvent = { checked: T };
  type DOMEvent = { target: { value: T } };
  type ValueOrEvent =
    | T
    | ChakraValueEvent
    | ChakraCheckedEvent
    | DOMEvent
    | null
    | undefined;

  const isChakraValueEvent = (
    value: ValueOrEvent
  ): value is ChakraValueEvent => {
    return (
      typeof value === "object" &&
      value !== null &&
      "value" in value &&
      !("checked" in value) &&
      !("target" in value)
    );
  };

  const isChakraCheckedEvent = (
    value: ValueOrEvent
  ): value is ChakraCheckedEvent => {
    return (
      typeof value === "object" &&
      value !== null &&
      "checked" in value &&
      !("target" in value)
    );
  };

  const isDOMEvent = (value: ValueOrEvent): value is DOMEvent => {
    return (
      typeof value === "object" &&
      value !== null &&
      "target" in value &&
      value.target !== null &&
      typeof value.target === "object" &&
      "value" in value.target
    );
  };

  const handleChange = useCallback(
    (valueOrEvent: ValueOrEvent) => {
      if (valueOrEvent === null || valueOrEvent === undefined) {
        return;
      }

      let value: T;

      if (isChakraValueEvent(valueOrEvent)) {
        value = valueOrEvent.value;
      } else if (isChakraCheckedEvent(valueOrEvent)) {
        value = valueOrEvent.checked;
      } else if (isDOMEvent(valueOrEvent)) {
        value = valueOrEvent.target.value;
      } else {
        value = valueOrEvent;
      }

      helpers.setValue(value);
    },
    [helpers]
  );

  const handleBlur = useCallback(
    (e?: FocusEvent<HTMLElement>) => {
      helpers.setTouched(true);
      if (field.onBlur) {
        field.onBlur(e);
      }
    },
    [helpers, field]
  );

  const shouldShowError = useMemo(() => {
    if (!meta.error) return false;
    if (meta.touched) return true;
    return meta.error !== validationMessages.required;
  }, [meta.error, meta.touched]);

  return useMemo(
    () => ({
      field: {
        ...field,
        value: field.value,
        onChange: handleChange,
        onBlur: handleBlur,
      },
      meta: {
        ...meta,
        error: shouldShowError ? meta.error : undefined,
      },
      helpers,
      formik,
      setValue: helpers.setValue,
      setTouched: helpers.setTouched,
      setError: helpers.setError,
    }),
    [field, meta, helpers, formik, handleChange, handleBlur, shouldShowError]
  );
}
