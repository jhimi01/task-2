import { Box, Button, NumberInput, Select, rem } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IoIosArrowDown } from "react-icons/io";
import { IconCalendar } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { z } from "zod";

interface FormProps {
  title: string;
  categoryLabel: string;
  categoryData: string[];
  amountLabel: string;
  dateLabel: string;
  initialValues: Record<string, any>;
  schema: z.ZodObject<any>;
  onSubmit: (values: any) => void;
  fieldNames: { category: string; amount: string; date: string };
}

const CustomForm = ({
  title,
  categoryLabel,
  categoryData,
  amountLabel,
  dateLabel,
  initialValues,
  schema,
  onSubmit,
  fieldNames,
}: FormProps) => {
  const form = useForm({
    initialValues,
    validate: (values) => {
      const result = schema.safeParse(values);
      return result.success ? {} : result.error.flatten().fieldErrors;
    },
  });

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit(onSubmit)}
      className="space-y-4 mt-5"
    >
      <Select
        label={categoryLabel}
        placeholder={`Select a ${title.toLowerCase()} category`}
        data={categoryData}
        rightSection={
          <IoIosArrowDown style={{ width: rem(16), height: rem(16) }} />
        }
        {...form.getInputProps(fieldNames.category)}
      />
      <NumberInput
        label={amountLabel}
        placeholder="12345"
        {...form.getInputProps(fieldNames.amount)}
      />
      <DateInput
        label={dateLabel}
        placeholder="dd/mm/yyyy"
        rightSection={
          <IconCalendar style={{ width: rem(16), height: rem(16) }} />
        }
        {...form.getInputProps(fieldNames.date)}
      />
      <Button w="100%" type="submit">
        Save
      </Button>
    </Box>
  );
};

export default CustomForm;
