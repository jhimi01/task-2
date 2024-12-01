"use client";
import { Box, Center, Tabs, Title } from "@mantine/core";
import CustomForm from "./CustomForm";
import classes from "./FinanceTabs.module.css";

export default function FinanceTabs() {
  const handleSubmit = (values: any) => {
    console.log("Form submitted:", values); // Log values upon submission
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
            type="expense" // Passing type to the form
            onSubmit={handleSubmit}
          />
        </Tabs.Panel>

        <Tabs.Panel value="income" pt="xs">
          <CustomForm
            title="Income"
            type="income" // Passing type to the form
            categoryData={["Salary", "Outsourcing", "Bond", "Dividend"]}
            onSubmit={handleSubmit}
          />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
