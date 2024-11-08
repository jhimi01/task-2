"use client";
import {
  Autocomplete,
  Box,
  Button,
  Center,
  NumberInput,
  Select,
  Tabs,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IoIosArrowDown } from "react-icons/io";
import classes from "./CustomForm.module.css";
import { IconCalendar } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useContext } from "react";
import AccountContext from "@/contexts/AccountContext";

export default function CustomForm() {
  const { setIncome, setExpenses } = useContext(AccountContext);

  const form = useForm({
    initialValues: {
      category: "",
      amount: 0,
      date: "",
    },
  });

  const handleSubmit = (values: {
    category: string;
    amount: number;
    date: string;
  }) => {
    const savedData = JSON.parse(localStorage.getItem("expenses") || "[]");
    const newEntry = { ...values, id: Date.now() };
    const updatedData = [...savedData, newEntry];

    localStorage.setItem("expenses", JSON.stringify(updatedData));

    // Update context state to reflect the new data
    setExpenses(updatedData);
  };

  return (
    <Box className="border rounded bg-slate-50 py-5 px-5">
      <Center>
        <Title order={2} className="text-slate-800" mb={30}>
          Expense Tracker
        </Title>
      </Center>

      <Tabs variant="unstyled" defaultValue="expense" classNames={classes}>
        <Tabs.List grow>
          <Tabs.Tab
            value="expense"
            className="rounded-s-md text-[15px] font-medium"
          >
            Expense
          </Tabs.Tab>
          <Tabs.Tab
            value="income"
            className="rounded-e-md text-[15px] font-medium"
          >
            Income
          </Tabs.Tab>
        </Tabs.List>

        {/* Matching Tab Panels */}
        <Tabs.Panel value="expense" pt="xs">
          {/* Expense form */}
          <Box
            component="form"
            onSubmit={form.onSubmit(handleSubmit)}
            className="space-y-4 mt-5"
          >
            <Select
              label="Category"
              placeholder="Select a category"
              data={[
                "Education",
                "Food",
                "Health",
                "Bill",
                "Insurance",
                "Tax",
                "Transport",
                "Telephone",
              ]}
              rightSection={
                <IoIosArrowDown style={{ width: rem(16), height: rem(16) }} />
              }
              {...form.getInputProps("category")}
            />
            <NumberInput
              label="Amount"
              placeholder="12345"
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
        </Tabs.Panel>

        <Tabs.Panel value="income" pt="xs">
          {/* income form */}
          <Box className="space-y-4 mt-5">
            <Autocomplete
              label="Category"
              placeholder="Select a category"
              data={["Salary", "Outsourcing", "Bond", "Dividend"]}
              rightSection={
                <IoIosArrowDown style={{ width: rem(16), height: rem(16) }} />
              }
            />
            <TextInput label="Amount" placeholder="12345" />
            <DateInput label="Date" placeholder="dd/mm/yyyy" />
            <Button w="100%">Save</Button>
          </Box>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
