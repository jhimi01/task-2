"use client";
import {
  Box,
  Button,
  Center,
  NumberInput,
  Select,
  Tabs,
  Title,
  rem,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IoIosArrowDown } from "react-icons/io";
import classes from "./CustomForm.module.css";
import { IconCalendar } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; // Optional if you use React Hook Form integration
import { useAccount } from "@/contexts/AccountContext";
import { useCounterStore } from "@/app/useCounterStore";
import { useState } from "react";

// Define Zod schemas
const expenseSchema = z.object({
  category: z.string().min(1, "Category is required"),
  amount: z
    .number()
    .min(1, "Amount must be greater than 0")
    .max(1000000, "Amount must not exceed 1,000,000"),
  // date: z.string().min(1, "Date is required"),
});

const incomeSchema = z.object({
  incomecategory: z.string().min(1, "Income category is required"),
  incomeamount: z
    .number()
    .min(1, "Amount must be greater than 0")
    .max(1000000, "Amount must not exceed 1,000,000"),
  // incomedate: z.string().min(1, "Date is required"),
});

export default function CustomForm() {
  const { setIncome, setExpenses } = useAccount();
  const addIncome = useCounterStore((state) => state.addIncome);
  const addExpenses = useCounterStore((state) => state.addExpenses);

  const formExpense = useForm({
    initialValues: {
      category: "",
      amount: 0,
      date: "",
    },
    validate: (values) => {
      const result = expenseSchema.safeParse(values);
      return result.success ? {} : result.error.flatten().fieldErrors;
    },
  });

  const formIncome = useForm({
    initialValues: {
      incomecategory: "",
      incomeamount: 0,
      incomedate: "",
    },
    validate: (values) => {
      const result = incomeSchema.safeParse(values);
      return result.success ? {} : result.error.flatten().fieldErrors;
    },
  });

  // income submition ---------
  const handleSubmitIncome = (values: {
    incomecategory: string;
    incomeamount: number;
    incomedate: any;
  }) => {
    const savedDate = JSON.parse(localStorage.getItem("income") || "[]");
    const newArray = { ...values, id: Date.now() };
    const updatedData = [...savedDate, newArray];

    localStorage.setItem("income", JSON.stringify(updatedData));

    // addIncome(values);
    setIncome(updatedData);
  };

  // expenses submition ---------
  const handleSubmit = (values: {
    category: string;
    amount: number;
    date: any;
  }) => {
    const savedData = JSON.parse(localStorage.getItem("expenses") || "[]");
    const newEntry = { ...values, id: Date.now() };
    const updatedData = [...savedData, newEntry];

    localStorage.setItem("expenses", JSON.stringify(updatedData));

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

        <Tabs.Panel value="expense" pt="xs">
          <Box
            component="form"
            onSubmit={formExpense.onSubmit(handleSubmit)}
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
              {...formExpense.getInputProps("category")}
            />
            <NumberInput
              label="Amount"
              placeholder="12345"
              {...formExpense.getInputProps("amount")}
            />
            <DateInput
              label="Date"
              placeholder="dd/mm/yyyy"
              rightSection={
                <IconCalendar style={{ width: rem(16), height: rem(16) }} />
              }
              {...formExpense.getInputProps("date")}
            />
            <Button w="100%" type="submit">
              Save
            </Button>
          </Box>
        </Tabs.Panel>

        <Tabs.Panel value="income" pt="xs">
          <Box
            component="form"
            onSubmit={formIncome.onSubmit(handleSubmitIncome)}
            className="space-y-4 mt-5"
          >
            <Select
              label="Category"
              placeholder="Select a category"
              data={["Salary", "Outsourcing", "Bond", "Dividend"]}
              {...formIncome.getInputProps("incomecategory")}
              rightSection={
                <IoIosArrowDown style={{ width: rem(16), height: rem(16) }} />
              }
            />
            <NumberInput
              label="Amount"
              placeholder="12345"
              {...formIncome.getInputProps("incomeamount")}
            />
            <DateInput
              label="Date"
              placeholder="dd/mm/yyyy"
              {...formIncome.getInputProps("incomedate")}
            />
            <Button type="submit" w="100%">
              Save
            </Button>
          </Box>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
