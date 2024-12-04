"use client";

import useCookie from "@/hooks/useCookie";
import { AppShell, Box, Burger, Button, Drawer, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Navbar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { getCookie, removeCookie } = useCookie(); // Access `removeCookie`
  const token = getCookie("accessToken");
  const router = useRouter();

  const handleLogout = () => {
    removeCookie("accessToken"); // Remove the token
    router.push("/login"); // Redirect to login page
  };

  return (
    <AppShell
      className="wrapper flex-between space-y-3 md:space-y-0 border mb-5"
      px={15}
    >
      <Image src="/logo.avif" alt="logo" w={50} h={50} />

      {/* Desktop Links */}
      <Box className="space-x-6 md:block hidden font-medium text-slate-800">
        <Link href="/">Home</Link>
        <Link href="/app">App</Link>
        <Link href="/account">Account</Link>
        <Link href="/export">Export</Link>
      </Box>

      {token ? (
        <Button onClick={handleLogout} className="md:block hidden">
          Logout
        </Button>
      ) : (
        <Link href="/login">
          <Button className="md:block hidden">Login</Button>
        </Link>
      )}

      {/* Mobile Drawer with Links */}
      <Drawer
        opened={opened}
        onClose={close}
        size="sm"
        padding="md"
        className="md:hidden"
      >
        <Box className="flex-col flex space-y-3">
          <Link
            href="/"
            onClick={close}
            className="py-3 text-white bg-primary hover:bg-[#4a9d8f] px-2 rounded-md"
          >
            Home
          </Link>
          <Link
            href="/app"
            onClick={close}
            className="py-3 text-white bg-primary hover:bg-[#4a9d8f] px-2 rounded-md"
          >
            App
          </Link>
          <Link
            href="/account"
            onClick={close}
            className="py-3 text-white bg-primary hover:bg-[#4a9d8f] px-2 rounded-md"
          >
            Account
          </Link>
          <Link
            href="/export"
            onClick={close}
            className="py-3 text-white bg-primary hover:bg-[#4a9d8f] px-2 rounded-md"
          >
            Export
          </Link>
        </Box>
      </Drawer>

      {/* Burger button to toggle Drawer */}
      <Burger
        opened={opened}
        onClick={toggle}
        className="md:hidden bg-primary rounded"
        style={{ color: "#ffffff" }}
      />
    </AppShell>
  );
}
