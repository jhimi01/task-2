"use client";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Flex,
  Menu,
  rem,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconAdjustments,
  IconLineHeight,
  IconWallet,
  IconWalletOff,
  IconPencil,
  IconTrash,
  IconSettings,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconArrowsLeftRight,
} from "@tabler/icons-react";
import React, { useContext } from "react";
import "@mantine/dates/styles.css";
import AccountContext, { useAccount } from "@/contexts/AccountContext";

export default function Output() {
  const { income, expenses, setExpenses } = useAccount();

  console.log(expenses);

  const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  const isSmallDevice = useMediaQuery("(max-width: 768px)");

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-Us", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleTrash = (id: number) => {
    const result = expenses.filter((exp) => exp.id !== id);
    localStorage.setItem("expenses", JSON.stringify(result));
    setExpenses(result);
  };

  return (
    <Box>
      <Flex
        className="border mb-5 rounded-md bg-slate-50 mt-5 md:mt-0 text-slate-800"

        // Adjust spacing based on screen size
      >
        <div
          className={`text-center flex-1 py-5 ${
            balance < 0 && "bg-[#ff0000] text-white"
          }`}
        >
          <Title order={3} size={isSmallDevice ? rem(14) : rem(24)}>
            BDT {balance}
          </Title>
          <Text
            size={isSmallDevice ? "10px" : "sm"}
            className={`${balance < 0 && "text-white"}`}
          >
            Balance
          </Text>
        </div>
        <Divider orientation="vertical" />
        <div className="text-center flex-1 py-5">
          <Title order={3} size={isSmallDevice ? rem(14) : rem(24)}>
            BDT {totalIncome}
          </Title>
          <Text
            size={isSmallDevice ? "10px" : "sm"}
            className="text-slate-700 font-medium"
          >
            Total Income
          </Text>
        </div>
        <Divider orientation="vertical" />
        <div className="text-center flex-1 py-5">
          <Title order={3} size={isSmallDevice ? rem(14) : rem(24)}>
            BDT {totalExpense}
          </Title>
          <Text
            size={isSmallDevice ? "10px" : "sm"}
            className="text-slate-700 font-medium"
          >
            Total Expense
          </Text>
        </div>
      </Flex>

      <div className="justify-between md:flex gap-5 rounded-md">
        {/* income out */}
        <Box className="rounded-md border flex-1 md:mb-0 mb-5">
          <Box className="bg-slate-50 rounded-md flex-between p-5">
            <Flex gap={10}>
              <ActionIcon variant="filled" aria-label="Settings">
                <IconWallet
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
              <Text fw={600}>Income</Text>
            </Flex>
            <Flex gap={10}>
              {/* ------ low to high/ high to low -------- */}
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon
                    className="bg-white hover:bg-slate-200 hover:text-black text-black outline outline-[1px] outline-slate-600"
                    aria-label="Settings"
                  >
                    <IconLineHeight
                      style={{ width: "70%", height: "70%" }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item>Low to High</Menu.Item>
                  <Menu.Item>High to Low</Menu.Item>
                </Menu.Dropdown>
              </Menu>

              {/* ------ filter data -------- */}
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon
                    className="bg-white hover:bg-slate-200 hover:text-black text-black outline outline-[1px] outline-slate-600"
                    aria-label="Settings"
                  >
                    <IconAdjustments
                      style={{ width: "70%", height: "70%" }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown className="space-y-3 pb-5">
                  <Checkbox label="salary" />
                  <Checkbox label="outsourcing" />
                  <Checkbox label="Bond" />
                  <Checkbox label="Devidend" />
                </Menu.Dropdown>
              </Menu>
            </Flex>
          </Box>
          <Divider orientation="horizontal" />
          <Box className="p-5 text-slate-800">
            {income?.length === 0 ? (
              <Center>
                <Title order={4}>No Income</Title>
              </Center>
            ) : (
              income?.map((incomeitem, index) => (
                <Box key={index}>
                  <Flex className="justify-between group items-center">
                    <Box>
                      <Text size="lg" fw={600}>
                        {incomeitem?.category}
                      </Text>
                      <Text size="sm">{formatDate(incomeitem?.date)}</Text>
                    </Box>
                    <div className="flex gap-2">
                      <Title order={5}>BDT {incomeitem?.amount}</Title>
                      <IconPencil
                        className="group-hover:block hidden cursor-pointer"
                        style={{ width: "25px", height: "25px" }}
                        stroke={1.5}
                      />
                      <IconTrash
                        onClick={handleTrash}
                        className="group-hover:block hidden cursor-pointer"
                        style={{ width: "25px", height: "25px" }}
                        stroke={1.5}
                      />
                    </div>
                  </Flex>
                  <Divider orientation="horizontal" my={5} />
                </Box>
              ))
            )}
          </Box>
        </Box>

        {/* Expense out */}
        <Box className="rounded-md flex-1 border">
          <Box className="bg-slate-50 rounded-md flex-between p-5">
            <Flex gap={10}>
              <ActionIcon className="bg-[#D91656]" aria-label="Settings">
                <IconWalletOff
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
              <Text fw={600}>Expense</Text>
            </Flex>
            <Flex gap={10}>
              {/* ------ low to high/ high to low -------- */}
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon
                    className="bg-white hover:bg-slate-200 hover:text-black text-black outline outline-[1px] outline-slate-600"
                    aria-label="Settings"
                  >
                    <IconLineHeight
                      style={{ width: "70%", height: "70%" }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item>Low to High</Menu.Item>
                  <Menu.Item>High to Low</Menu.Item>
                </Menu.Dropdown>
              </Menu>

              {/* ------ filter data -------- */}
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon
                    className="bg-white hover:bg-slate-200 hover:text-black text-black outline outline-[1px] outline-slate-600"
                    aria-label="Settings"
                  >
                    <IconAdjustments
                      style={{ width: "70%", height: "70%" }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown className="space-y-3 pb-5">
                  <Checkbox label="Education" />
                  <Checkbox label="Food" />
                  <Checkbox label="Health" />
                  <Checkbox label="Bill" />
                  <Checkbox label="Tax" />
                  <Checkbox label="Transport" />
                  <Checkbox label="Telephone" />
                </Menu.Dropdown>
              </Menu>
            </Flex>
          </Box>
          <Divider orientation="horizontal" />
          <Box className="p-5 text-slate-800">
            {expenses?.length === 0 ? (
              <Text>No expenses</Text>
            ) : (
              expenses?.map((expense, index) => (
                <Box key={index}>
                  <Flex className="justify-between group items-center">
                    <Box>
                      <Text size="lg" fw={600}>
                        {expense?.category}
                      </Text>
                      <Text size="sm">{formatDate(expense?.date)}</Text>
                    </Box>
                    <div className="flex gap-2">
                      <Title order={5}>BDT {expense?.amount}</Title>
                      <IconPencil
                        className="group-hover:block hidden cursor-pointer"
                        style={{ width: "25px", height: "25px" }}
                        stroke={1.5}
                      />
                      <IconTrash
                        onClick={() => handleTrash(expense?.id)}
                        className="group-hover:block hidden cursor-pointer"
                        style={{ width: "25px", height: "25px" }}
                        stroke={1.5}
                      />
                    </div>
                  </Flex>
                  <Divider orientation="horizontal" my={5} />
                </Box>
              ))
            )}
          </Box>
        </Box>
      </div>
    </Box>
  );
}
