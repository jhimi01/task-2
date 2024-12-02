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
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { z } from "zod";

// Validation schema for login form
const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .refine((email) => {
      const domain = email.split("@")[1];
      return domain && domain.split(".").length > 1;
    }, "(e.g., example@gmail.com)")
    .refine(
      (email) => /^[a-zA-Z0-9.-]+$/.test(email.split("@")[1]),
      "Email domain contains invalid characters"
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

export default function Login() {
  // const { login } = useAuth(); // Access the login mutation
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      termsOfService: false,
    },
    validate: (values) => {
      const result = loginSchema.safeParse(values);
      return result.success ? {} : result.error.flatten().fieldErrors;
    },
  });

  const Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzMzMTUzMDU3LCJleHAiOjE3MzMyMzk0NTd9.VNnEkyTQJoWaaCRxMMSOB3vUlPavEbjND-lD7_d1upA";

  const handleSubmit = (values: typeof form.values) => {
    const { email, password } = values; // Send only necessary fields

    axios
    .post(
      "http://localhost:3000/auth/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      }
    )
    .then((res) => {
      console.log("Post", res.data);
      const token = res.data.token;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully submitted",
        showConfirmButton: false,
        timer: 1500,
      });
      form.reset();
    })
    .catch((error) => {
      console.error(
        "Post request failed:",
        error?.response?.data?.message || error.message
      );
    });
  
  };

  return (
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

        {/* Form */}
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
            <Checkbox
              label="Remember me"
              {...form.getInputProps("termsOfService", { type: "checkbox" })}
            />
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
            <Button
              fullWidth
              type="submit"
              // loading={login.isLoading}
            >
              Submit
            </Button>
          </Group>

          {/* Error message */}
          {/* {login.error && (
            <p className="text-red-500 text-sm">
              Login failed: {login.error.message}
            </p>
          )} */}
        </form>
      </Box>

      {/* Image Section */}
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
  );
}
