import {
  ActionIcon,
  Box,
  Center,
  Divider,
  Flex,
  Text,
  Title,
} from "@mantine/core";
import {
  IconAdjustments,
  IconLineHeight,
  IconWallet,
  IconWalletOff,
} from "@tabler/icons-react";
import React from "react";

export default function Output() {
  return (
    <Box>
      <Flex className="border py-5 mb-5 rounded-md bg-slate-50 flex items-center justify-around text-slate-800">
        <div className="text-center">
          <Title order={3}>BDT 20000</Title>
          <Text size="sm" className="text-slate-700 font-medium">
            Balance
          </Text>
        </div>
        <Divider orientation="vertical" />
        <div className="text-center">
          <Title order={3}>BDT 20000</Title>
          <Text size="sm" className="text-slate-700 font-medium">
            Total Income
          </Text>
        </div>
        <Divider orientation="vertical" />
        <div className="text-center">
          <Title order={3}>BDT 20000</Title>
          <Text size="sm" className="text-slate-700 font-medium">
            Total Expense
          </Text>
        </div>
      </Flex>

      <Flex className="justify-between gap-5 rounded-md">
        {/* income out */}
        <Box className="rounded-md border flex-1">
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
              <ActionIcon
                className="bg-white text-black outline outline-[1px] outline-slate-600"
                aria-label="Settings"
              >
                <IconLineHeight
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
              <ActionIcon
                className="bg-white text-black outline outline-[1px] outline-slate-600"
                aria-label="Settings"
              >
                <IconAdjustments
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Flex>
          </Box>
          <Divider orientation="horizontal" />
          <Box className="p-5 text-slate-800">
            <Flex className=" justify-between items-center">
              <Box>
                <Text size="lg" fw={600}>
                  Salary
                </Text>
                <Text size="sm">11, January, 2024</Text>
              </Box>
              <Title order={5}>BDT 10000</Title>
            </Flex>
            <Divider orientation="horizontal" my={5} />
            <Flex className=" justify-between items-center">
              <Box>
                <Text size="lg" fw={600}>
                  Salary
                </Text>
                <Text size="sm">11, January, 2024</Text>
              </Box>
              <Title order={5}>BDT 10000</Title>
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
              <ActionIcon
                className="bg-white text-black outline outline-[1px] outline-slate-600"
                aria-label="Settings"
              >
                <IconLineHeight
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
              <ActionIcon
                className="bg-white text-black outline outline-[1px] outline-slate-600"
                aria-label="Settings"
              >
                <IconAdjustments
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Flex>
          </Box>
          <Divider orientation="horizontal" />
          <Box className="p-5 text-slate-800">
            <Flex className=" justify-between items-center">
              <Box>
                <Text size="lg" fw={600}>
                  Education
                </Text>
                <Text size="sm">11, January, 2024</Text>
              </Box>
              <Title order={5}>BDT 10000</Title>
            </Flex>
            <Divider orientation="horizontal" my={5} />
            <Flex className=" justify-between items-center">
              <Box>
                <Text size="lg" fw={600}>
                  Food
                </Text>
                <Text size="sm">11, January, 2024</Text>
              </Box>
              <Title order={5}>BDT 10000</Title>
            </Flex>
            <Divider orientation="horizontal" my={5} />
            <Flex className=" justify-between items-center">
              <Box>
                <Text size="lg" fw={600}>
                  Health
                </Text>
                <Text size="sm">11, January, 2024</Text>
              </Box>
              <Title order={5}>BDT 10000</Title>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
