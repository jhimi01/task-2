// 'use client'

import "@mantine/core/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createTheme, MantineProvider } from "@mantine/core";

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/shared/Navbar";
import ClientSideColorSchemeScript from "./ColorSchemaScript";
import { AccountProvider } from "@/contexts/AccountContext";
import ReactQueryProvider from "./ReactQueryProvider";
// import { useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const theme = createTheme({
  primaryColor: "customGreen",
  colors: {
    customGreen: [
      "#12947F",
      "#12947F",
      "#12947F",
      "#12947F",
      "#12947F",
      "#12947F",
      "#12947F",
      "#12947F",
      "#12947F",
      "#12947F",
    ],
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <AccountProvider>
        <html lang="en">
          <head>
            <ClientSideColorSchemeScript />
          </head>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            style={{ backgroundColor: "#ffffff", color: "#000000" }}
          >
            <MantineProvider theme={theme}>
              <Navbar />
              {children}
            </MantineProvider>
          </body>
        </html>
      </AccountProvider>
    </ReactQueryProvider>
  );
}
