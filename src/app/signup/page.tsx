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

const signUpSchema = z.object({
  fullname: z.string().min(2, "Full name must be at least 2 characters long"),
  username: z.string().min(4, "Username must be at least 4 characters long"),
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
    },
    validate: (value) => {
      const result = signUpSchema.safeParse(value);
      return result.success ? {} : result.error.flatten().fieldErrors;
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
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
        {/* Form here */}
        <form className="space-y-3" onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Full Name"
            placeholder="type your name"
            {...form.getInputProps("fullname")}
          />
          <TextInput
            label="Username"
            placeholder="type your username"
            {...form.getInputProps("username")}
          />
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            // key={form.key("email")}
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

          <Group className="">
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

      {/* image section */}
      <Box className="flex-1">
        <Image
          src="./login2.svg"
          alt="login"
          height={50}
          className="w-full h-full"
          width={50}
          priority 
        ></Image>
      </Box>
    </Flex>
  );
}
