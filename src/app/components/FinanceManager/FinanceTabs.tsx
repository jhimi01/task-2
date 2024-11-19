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
import classes from "./FinanceTabs.module.css";
import { IconCalendar } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; // Optional if you use React Hook Form integration
import { useAccount } from "@/contexts/AccountContext";
import { useCounterStore } from "@/app/useCounterStore";
import { useState } from "react";
import CustomForm from "./CustomForm";

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

export default function FinanceTabs() {
  const { setIncome, setExpenses } = useAccount();


  // income submition ---------
  const handleIncomeSubmit = (values: {
    incomecategory: string;
    incomeamount: number;
    incomedate: any;
  }) => {
    const savedDate = JSON.parse(localStorage.getItem("income") || "[]");
    const newArray = { ...values, id: Date.now() };
    const updatedData = [...savedDate, newArray];
    console.log("this is a new income");

    localStorage.setItem("income", JSON.stringify(updatedData));

    // addIncome(values);
    setIncome(updatedData);
  };

  // expenses submition ---------
  const handleExpenseSubmit = (values: {
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
          <CustomForm
            title="Expense"
            categoryLabel="Category"
            categoryData={[
              "Education",
              "Food",
              "Health",
              "Bill",
              "Insurance",
              "Tax",
              "Transport",
              "Telephone",
            ]}
            amountLabel="Amount"
            dateLabel="Date"
            initialValues={{ category: "", amount: 0, date: "" }}
            schema={expenseSchema}
            onSubmit={handleExpenseSubmit}
            fieldNames={{
              category: "category",
              amount: "amount",
              date: "date",
            }}
          />
        </Tabs.Panel>

        <Tabs.Panel value="income" pt="xs">
          <CustomForm
            title="Income"
            categoryLabel="Income Category"
            categoryData={["Salary", "Outsourcing", "Bond", "Dividend"]}
            amountLabel="Income Amount"
            dateLabel="Income Date"
            initialValues={{
              incomecategory: "",
              incomeamount: 0,
              incomedate: "",
            }}
            schema={incomeSchema}
            onSubmit={handleIncomeSubmit}
            fieldNames={{
              category: "incomecategory",
              amount: "incomeamount",
              date: "incomedate",
            }}
          />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
