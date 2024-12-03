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
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { showNotification } from "@mantine/notifications";
import axios from "axios";

const signUpSchema = z.object({
  fullname: z.string().min(2, "Full name must be at least 2 characters long"),
  username: z
    .string()
    .min(4, "Username must be at least 4 characters long")
    .regex(/\d{2}/, "Username must include at least one two-digit number"),
  email: z
    .string()
    .email("Invalid email format") // Basic email format check (e.g., user@example.com)
    .refine((email) => {
      // Check if the domain part has at least one dot after '@' and no unusual characters
      const domain = email.split("@")[1];
      return domain && domain.split(".").length > 1;
    }, "(e.g., example@gmail.com)")
    .refine((email) => {
      // Check if the domain does not contain unusual characters
      const domain = email.split("@")[1];
      return /^[a-zA-Z0-9.-]+$/.test(domain);
    }, "Email domain contains invalid characters"),

  password: z
    .string()
    .min(8, "min 8 characters")
    .regex(/[A-Z]/, "at least one uppercase letter")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "at least one special character"),
});

export default function SignUp() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      termsOfService: false, // Add this
    },

    validate: (value) => {
      const result = signUpSchema.safeParse(value);
      return result.success ? {} : result.error.flatten().fieldErrors;
    },
  });

  const generateRandomId = () => Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit random ID

  // Inside your SignUp component:
  const handleSubmit = async (values: typeof form.values) => {
    const { email, password, username } = values;
    const payload = { email, password, username };
    console.log("Form values:", values);

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/signup",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        showNotification({
          title: "Success",
          message: "Signup successful!",
          color: "green",
        });
        console.log("Signup successful:", response.data);
      } else {
        showNotification({
          title: "Error",
          message: response.data.message || "Signup failed.",
          color: "red",
        });
        console.error("Signup failed:", response.data.message || response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification({
          title: "Error",
          message:
            error.response?.data?.message || "An error occurred during signup.",
          color: "red",
        });
        console.error(
          "An error occurred during signup:",
          error.response?.data?.message || error.message
        );
      } else {
        showNotification({
          title: "Error",
          message: "An unknown error occurred.",
          color: "red",
        });
        console.error("An unknown error occurred:", error);
      }
    }
  };

  return (
    <Flex
      align="center"
      gap={50}
      className="wrapper lg:flex-row flex-col"
      justify="space-between"
    >
      <Box className="flex-1 mx-auto w-full px-2 lg:px-20">
        <Title order={1} mb={6} className="text-slate-900">
          Sign Up
        </Title>
        <form className="space-y-3" onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Full Name"
            placeholder="Type your name"
            {...form.getInputProps("fullname")}
          />
          <TextInput
            label="Username"
            placeholder="Type your username"
            {...form.getInputProps("username")}
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="password"
            {...form.getInputProps("password")}
          />

          <Flex align={"center"} my={20} justify={"space-between"}>
            <Checkbox
              label="Remember me"
              key={form.key("termsOfService")}
              {...form.getInputProps("termsOfService", { type: "checkbox" })}
            />
            <span className="text-sm underline text-primary">
              <a href="#">Forget Password</a>
            </span>
          </Flex>

          <Group>
            <div className="text-sm pt-3 text-slate-500">
              <p>
                Do you already have an account?
                <span className="underline ml-1 text-primary">
                  <Link href="/login">Login</Link>
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
          alt="login"
          height={50}
          className="w-full h-full"
          width={50}
          priority
        />
      </Box>
    </Flex>
  );
}
