"use client";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Group,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import useCookie from "@/hooks/useCookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const { setCookie } = useCookie(); // Import the custom hook
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const token = response.data.accessToken;
      if (token) {
        // Save the token in cookies
        setCookie("accessToken", token, { expires: 7 });
        toast.success("Login successful! Redirecting...", {
          position: "top-right",
        });
        router.push("/")
      } else {
        toast.error("Login failed. No token received.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.", { position: "top-right" });
    }
  };

  return (
    <>
      <ToastContainer />
      <Flex
        align="center"
        pt={20}
        gap={50}
        className="wrapper lg:flex-row flex-col"
        justify="space-between"
      >
        <Box className="flex-1 mx-auto lg:px-20 px-2 w-full">
          <Title order={1} mb={6} className="text-slate-900">
            Login
          </Title>

          <form className="space-y-3" onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />

            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="Enter your password"
              {...form.getInputProps("password")}
            />

            <Flex align="center" my={20} justify="space-between">
              <Checkbox label="Remember me" />
              <span className="text-sm underline text-primary">
                <a href="#">Forgot Password?</a>
              </span>
            </Flex>

            <Group>
              <div className="text-sm pt-3 text-slate-500">
                <p>
                  Are you new here?
                  <span className="underline ml-1 text-primary">
                    <Link href="/signup">Sign up</Link>
                  </span>
                </p>
              </div>
              <Button fullWidth type="submit">
                Submit
              </Button>
            </Group>
          </form>
        </Box>

        <Box className="flex-1">
          <Image
            src="./login2.svg"
            alt="Login Illustration"
            height={50}
            className="w-full h-full"
            width={50}
            priority
          />
        </Box>
      </Flex>
    </>
  );
}
