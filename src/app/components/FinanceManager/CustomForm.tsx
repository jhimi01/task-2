"use client";
import { Box, Button, NumberInput, Select, rem } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IoIosArrowDown } from "react-icons/io";
import { IconCalendar } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { z } from "zod";

interface FormProps {
  title: string;
  categoryData: string[];
  type: string; // Type is passed as a prop
  onSubmit: (values: any) => void;
}

const schema = z.object({
  category: z.string().nonempty("Category is required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  date: z.date(),
  type: z.string().nonempty("Type is required"), // Validation for type
});

const CustomForm = ({ title, categoryData, type, onSubmit }: FormProps) => {
  const form = useForm({
    initialValues: { category: "", amount: 0, date: new Date(), type: type }, // Pass the type as initial value
    validate: (values) => {
      const result = schema.safeParse(values);
      return result.success ? {} : result.error.flatten().fieldErrors;
    },
  });

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit((values) => {
        console.log("Form Submitted:", values); // Log form data on submit
        onSubmit(values); // Call the parent onSubmit function
      })}
      className="space-y-4 mt-5"
    >
      <Select
        label={`Category`}
        placeholder={`Select a ${title.toLowerCase()} category`}
        data={categoryData}
        rightSection={
          <IoIosArrowDown style={{ width: rem(16), height: rem(16) }} />
        }
        {...form.getInputProps("category")}
      />
      <NumberInput
        label="Amount"
        placeholder="Enter amount"
        {...form.getInputProps("amount")}
      />
      <DateInput
        label="Date"
        placeholder="dd/mm/yyyy"
        rightSection={
          <IconCalendar style={{ width: rem(16), height: rem(16) }} />
        }
        {...form.getInputProps("date")}
      />
      <Button w="100%" type="submit">
        Save
      </Button>
    </Box>
  );
};

export default CustomForm;
