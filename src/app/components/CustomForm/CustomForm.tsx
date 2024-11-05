"use client";
import {
  Autocomplete,
  Box,
  Button,
  Center,
  NumberInput,
  Tabs,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IoIosArrowDown } from "react-icons/io";
import classes from "./CustomForm.module.css";
import { IconCalendar } from "@tabler/icons-react";

export default function CustomForm() {
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
          <Box className="space-y-4 mt-5">
            <Autocomplete
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
            />
            <NumberInput label="Amount" placeholder="12345" />
            <DateInput
              label="Date"
              placeholder="dd/mm/yyyy"
              rightSection={
                <IconCalendar style={{ width: rem(16), height: rem(16) }} />
              }
            />
            <Button w="100%">Save</Button>
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
