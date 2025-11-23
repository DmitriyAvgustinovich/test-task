import { Formik, Form } from "formik";
import { Button, Stack, Heading, Box, Card } from "@chakra-ui/react";
import { propertySchema } from "../schemas/propertySchema";
import { FormInput } from "./FormInput";
import { FormNumberInput } from "./FormNumberInput";
import { FormRadioGroup } from "./FormRadioGroup";
import { FormCheckbox } from "./FormCheckbox";

interface ExtendedFormValues {
  name: string;
  address: string;
  floor: number | undefined;
  totalFloors: number | undefined;
  square: number | undefined;
  livingSquare: number | undefined;
  kitchenSquare: number | undefined;
  propertyType?: string;
  hasParking?: boolean;
  hasElevator?: boolean;
}

const initialValues: ExtendedFormValues = {
  name: "",
  address: "",
  floor: undefined,
  totalFloors: undefined,
  square: undefined,
  livingSquare: undefined,
  kitchenSquare: undefined,
  propertyType: undefined,
  hasParking: false,
  hasElevator: false,
};

export const PropertyForm = () => {
  const handleSubmit = (values: ExtendedFormValues) => {
    console.log("Form submitted:", values);
    alert("Форма успешно отправлена! Проверьте консоль для просмотра данных.");
  };

  return (
    <Box p={8} maxW="800px" width="100%">
      <Card.Root p={6}>
        <Heading size="xl" mb={6}>
          Добавить объявление
        </Heading>

        <Formik
          initialValues={initialValues}
          validationSchema={propertySchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <Stack gap={4}>
                <FormInput
                  name="name"
                  label="Название объекта"
                  placeholder="Введите название объекта"
                />

                <FormInput
                  name="address"
                  label="Адрес"
                  placeholder="Введите адрес"
                />

                <FormNumberInput
                  name="totalFloors"
                  label="Количество этажей в доме"
                  placeholder="Введите количество этажей"
                  min={-3}
                  max={200}
                />

                <FormNumberInput
                  name="floor"
                  label="Этаж"
                  placeholder="Введите этаж"
                  min={-1}
                />

                <FormNumberInput
                  name="square"
                  label="Площадь"
                  placeholder="Введите общую площадь"
                  min={0}
                  max={400}
                />

                <FormNumberInput
                  name="livingSquare"
                  label="Жилая площадь"
                  placeholder="Введите жилую площадь"
                  min={0}
                />

                <FormNumberInput
                  name="kitchenSquare"
                  label="Площадь кухни"
                  placeholder="Введите площадь кухни"
                  min={0}
                />

                <FormRadioGroup
                  name="propertyType"
                  label="Тип недвижимости"
                  options={[
                    { value: "apartment", label: "Квартира" },
                    { value: "house", label: "Дом" },
                    { value: "commercial", label: "Коммерческая" },
                  ]}
                />

                <FormCheckbox name="hasParking" label="Наличие парковки" />
                <FormCheckbox name="hasElevator" label="Наличие лифта" />

                <Button
                  type="submit"
                  colorPalette="blue"
                  size="lg"
                  disabled={isSubmitting || !isValid}
                  loading={isSubmitting}
                >
                  Отправить
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Card.Root>
    </Box>
  );
};
