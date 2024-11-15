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
import { useAccount } from "@/contexts/AccountContext";
import { useCounterStore } from "@/app/useCounterStore";

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
  });

  const formIncome = useForm({
    initialValues: {
      incomecategory: "",
      incomeamount: 0,
      incomedate: "",
    },
  });
// income submission (simplified)
const handleSubmitIncome = (values: {
  incomecategory: string;
  incomeamount: number;
  incomedate: string;
  id: number;  // Added id for direct storage in context state
}) => {
  addIncome({ ...values, id: Date.now() }); // Directly passing values with an added id
  const updatedIncomeData = useCounterStore.getState().income;
  localStorage.setItem("income", JSON.stringify(updatedIncomeData));
  setIncome(updatedIncomeData);
};

// expense submission (simplified)
const handleSubmit = (values: {
  category: string;
  amount: number;
  date: string;
  id: number;
}) => {
  addExpenses({ ...values, id: Date.now() }); // Directly passing values with an added id
  const updatedExpenseData = useCounterStore.getState().expenses;
  localStorage.setItem("expenses", JSON.stringify(updatedExpenseData));
  setExpenses(updatedExpenseData);
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
          {/* Expense form */}
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
          {/* income form */}
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
