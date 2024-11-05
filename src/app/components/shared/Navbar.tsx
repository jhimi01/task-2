import { AppShell, Box, Button, Image } from "@mantine/core";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <AppShell className="wrapper flex-between border mb-5" px={15} >
      <Image src="/logo.avif" className="" alt="logo" w={50} h={50} />
      <Box className="space-x-6 font-medium text-slate-800">
        <Link href="/">Home</Link>
        <Link href="/app">App</Link>
        <Link href="/account">Account</Link>
        <Link href="/export">Export</Link>
      </Box>
      <Button>get App</Button>
    </AppShell>
  );
}
