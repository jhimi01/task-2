"use client";
import { Box, Center, Tabs, Title } from "@mantine/core";
import CustomForm from "./CustomForm";
import classes from "./FinanceTabs.module.css";
import Swal from "sweetalert2";
import axios from "axios";

const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzMzMjMwNjgwLCJleHAiOjE3MzMzMTcwODB9.kNP5-KYN7okp_ZB97Bfn7I5hhCoeujpGcLth5MgnFpg" // Ensure the token is accessible client-side

export default function FinanceTabs() {
  const handleSubmit = async (values: any) => {
    console.log("Form submitted:", values); // Log values upon submission
    const url = `http://localhost:3000/transaction`;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            url,
            values, // Pass the form data here
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Token}`,
              },
            }
          );
          console.log("Submit successful:", response.data);
          Swal.fire("Submitted!", "Your transaction has been recorded.", "success");
          // Handle successful submission (e.g., update UI or state)
        } catch (error) {
          console.error("Error submitting transaction:", error);
          Swal.fire("Error!", "Failed to submit the transaction.", "error");
          // Handle error
        }
      }
    });
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
