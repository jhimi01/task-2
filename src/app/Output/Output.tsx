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

  const { income, expenses } = useAccount();

const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
const balance = totalIncome - totalExpense;


  const isSmallDevice = useMediaQuery("(max-width: 768px)");

  return (
    <Box>
     <Flex
        className="border py-5 mb-5 rounded-md bg-slate-50 flex items-center mt-5 md:mt-0 justify-around text-slate-800"
        gap={isSmallDevice ? "md" : "xl"} // Adjust spacing based on screen size
      >
        <div className={`text-center ${balance < 0 && "bg-red-500"}`}>
          <Title order={3} size={isSmallDevice ? rem(14) : rem(24)}>
            BDT {balance}
          </Title>
          <Text
            size={isSmallDevice ? "10px" : "sm"}
            className="text-slate-700 font-medium"
          >
            Balance
          </Text>
        </div>
        <Divider orientation="vertical" />
        <div className="text-center">
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
        <div className="text-center">
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
            <Flex className="justify-between items-center group">
              <Box className="">
                <Text size="lg" fw={600}>
                  Salary
                </Text>
                <Text size="sm">11, January, 2024</Text>
              </Box>
              <div className="flex gap-2">
                <Title order={5}>BDT 10000</Title>

                <IconPencil
                  className="group-hover:block hidden cursor-pointer"
                  style={{ width: "25px", height: "25px" }}
                  stroke={1.5}
                />
                <IconTrash
                  className="group-hover:block hidden cursor-pointer"
                  style={{ width: "25px", height: "25px" }}
                  stroke={1.5}
                />
              </div>
            </Flex>
            <Divider orientation="horizontal" my={5} />
            <Flex className="group justify-between items-center">
              <Box>
                <Text size="lg" fw={600}>
                  Salary
                </Text>
                <Text size="sm">11, January, 2024</Text>
              </Box>
              <div className="flex gap-2">
                <Title order={5}>BDT 10000</Title>

                <IconPencil
                  className="group-hover:block hidden cursor-pointer"
                  style={{ width: "25px", height: "25px" }}
                  stroke={1.5}
                />
                <IconTrash
                  className="group-hover:block hidden cursor-pointer"
                  style={{ width: "25px", height: "25px" }}
                  stroke={1.5}
                />
              </div>
            </Flex>
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
            <Flex className=" justify-between group items-center">
              <Box>
                <Text size="lg" fw={600}>
                  Education
                </Text>
                <Text size="sm">11, January, 2024</Text>
              </Box>
              <div className="flex gap-2">
                <Title order={5}>BDT 10000</Title>

                <IconPencil
                  className="group-hover:block hidden cursor-pointer"
                  style={{ width: "25px", height: "25px" }}
                  stroke={1.5}
                />
                <IconTrash
                  className="group-hover:block hidden cursor-pointer"
                  style={{ width: "25px", height: "25px" }}
                  stroke={1.5}
                />
              </div>
            </Flex>
            <Divider orientation="horizontal" my={5} />
            <Flex className=" justify-between group items-center">
              <Box>
                <Text size="lg" fw={600}>
                  Food
                </Text>
                <Text size="sm">11, January, 2024</Text>
              </Box>
              <div className="flex gap-2">
                <Title order={5}>BDT 10000</Title>

                <IconPencil
                  className="group-hover:block hidden cursor-pointer"
                  style={{ width: "25px", height: "25px" }}
                  stroke={1.5}
                />
                <IconTrash
                  className="group-hover:block hidden cursor-pointer"
                  style={{ width: "25px", height: "25px" }}
                  stroke={1.5}
                />
              </div>
            </Flex>
            <Divider orientation="horizontal" my={5} />
            <Flex className=" justify-between group items-center">
              <Box>
                <Text size="lg" fw={600}>
                  Health
                </Text>
                <Text size="sm">11, January, 2024</Text>
              </Box>
              <div className="flex gap-2">
                <Title order={5}>BDT 10000</Title>

                <IconPencil
                  className="group-hover:block hidden cursor-pointer"
                  style={{ width: "25px", height: "25px" }}
                  stroke={1.5}
                />
                <IconTrash
                  className="group-hover:block hidden cursor-pointer"
                  style={{ width: "25px", height: "25px" }}
                  stroke={1.5}
                />
              </div>
            </Flex>
          </Box>
        </Box>
      </div>
    </Box>
  );
}
