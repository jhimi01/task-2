"use client";
import Swal from "sweetalert2";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Flex,
  Menu,
  Modal,
  NumberInput,
  rem,
  Select,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  IconAdjustments,
  IconLineHeight,
  IconWallet,
  IconWalletOff,
  IconPencil,
  IconTrash,
  IconCalendar,
} from "@tabler/icons-react";
import "@mantine/dates/styles.css";
import { useAccount } from "@/contexts/AccountContext";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";

interface EditIncome {
  id: number;
  incomecategory: string;
  incomeamount: number;
  incomedate: string;
}

interface EditExpenses {
  id: number;
  category: string;
  amount: number;
  date: string;
}

export default function Output() {
  const [editIncome, setEditIncome] = useState<EditIncome[]>([]);
  const [editExpenses, setEditExpenses] = useState<EditExpenses[]>([]);

  const { income, expenses, setExpenses, setIncome } = useAccount();

  const totalIncome = income.reduce((acc, curr) => acc + curr.incomeamount, 0);
  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  const isSmallDevice = useMediaQuery("(max-width: 768px)");

  const formatDate = (date: any) => {
    return new Date(date).toLocaleDateString("en-Us", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleTrashexpenses = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const result = expenses.filter((exp) => exp.id !== id);
        localStorage.setItem("expenses", JSON.stringify(result));
        setExpenses(result);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleTrashIncome = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const result = income.filter((inc) => inc.id !== id);
        localStorage.setItem("income", JSON.stringify(result));
        setIncome(result);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const [openedExpense, { open: openExpense, close: closeExpense }] =
    useDisclosure(false);
  const [openedIncome, { open: openIncome, close: closeIncome }] =
    useDisclosure(false);

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

  useEffect(() => {
    if (editExpenses) {
      formExpense.setValues({
        category: editExpenses.category,
        amount: editExpenses.amount,
        date: new Date(editExpenses.date),
      });
    }
  }, [editExpenses]);

  useEffect(() => {
    if (editIncome) {
      formIncome.setValues({
        incomecategory: editIncome.incomecategory,
        incomeamount: editIncome.incomeamount,
        incomedate: new Date(editIncome.incomedate),
      });
    }
  }, [editIncome]);

  const handleEditExpense = (id: number) => {
    const findData = expenses.find((expense) => expense.id === id);
    setEditExpenses(findData);
    openExpense();
  };

  const handleEditIncome = (id: number) => {
    const findData = income.find((incomeItem) => incomeItem.id === id);
    setEditIncome(findData);
    openIncome();
  };

  return (
    <Box>
      <Flex className="border mb-5 rounded-md bg-slate-50 mt-5 md:mt-0 text-slate-800">
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
                        {incomeitem?.incomecategory}
                      </Text>
                      <Text size="sm">
                        {formatDate(incomeitem?.incomedate)}
                      </Text>
                    </Box>
                    <div className="flex gap-2">
                      <Title order={5}>BDT {incomeitem?.incomeamount}</Title>
                      <IconPencil
                        onClick={() => handleEditIncome(incomeitem?.id)}
                        className="group-hover:block hidden cursor-pointer"
                      />
                      <IconTrash
                        onClick={() => handleTrashIncome(incomeitem?.id)}
                        className="group-hover:block hidden cursor-pointer"
                        style={{ width: "25px", height: "25px" }}
                        stroke={1.5}
                      />
                    </div>
                  </Flex>
                  {/* Conditional divider */}
                  {index !== income.length - 1 && (
                    <Divider orientation="horizontal" my={5} />
                  )}
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
              <Center>
                <Title order={4}>No Expenses</Title>
              </Center>
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
                        // onClick={open}
                        onClick={() => handleEditExpense(expense?.id)}
                        className="group-hover:block hidden cursor-pointer"
                        style={{ width: "25px", height: "25px" }}
                        stroke={1.5}
                      />
                      <IconTrash
                        onClick={() => handleTrashexpenses(expense?.id)}
                        className="group-hover:block hidden cursor-pointer"
                        style={{ width: "25px", height: "25px" }}
                        stroke={1.5}
                      />
                    </div>
                  </Flex>
                  {/* Conditional divider */}
                  {index !== expenses.length - 1 && (
                    <Divider orientation="horizontal" my={5} />
                  )}
                </Box>
              ))
            )}
          </Box>
        </Box>
      </div>

      {/* expense Edit Modal ------- */}
      <Modal opened={openedExpense} onClose={closeExpense}>
        <Title order={2} c={"#333"}>
          Edit information
        </Title>
        <Box
          component="form"
          onSubmit={formExpense.onSubmit((values) => {
            // Handle the form submission with updated values
            const updatedExpenses = expenses.map((expense) =>
              expense.id === editExpenses.id
                ? { ...expense, ...values }
                : expense
            );
            setExpenses(updatedExpenses);
            localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
            closeExpense();
          })}
          className="space-y-4 mt-3"
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
          <Button fullWidth type="submit">
            Save
          </Button>
        </Box>
      </Modal>

      {/* Income Edit Modal */}
      <Modal opened={openedIncome} onClose={closeIncome}>
        <Title order={2}>Edit Income</Title>
        <Box
          component="form"
          onSubmit={formIncome.onSubmit((values) => {
            const updatedIncome = income.map((item) =>
              item.id === editIncome?.id ? { ...item, ...values } : item
            );
            setIncome(updatedIncome);
            localStorage.setItem("income", JSON.stringify(updatedIncome));
            closeIncome();
          })}
          className="space-y-4 mt-3"
        >
          <Select
            label="Category"
            data={["Salary", "Outsourcing", "Bond", "Dividend"]}
            {...formIncome.getInputProps("incomecategory")}
          />
          <NumberInput
            label="Amount"
            {...formIncome.getInputProps("incomeamount")}
          />
          <DateInput label="Date" {...formIncome.getInputProps("incomedate")} />
          <Button fullWidth type="submit">
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
