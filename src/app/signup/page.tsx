"use client";
import {
  Box,
  Button,
  Checkbox,
  CheckIcon,
  Flex,
  Group,
  Notification,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";

const signUpSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters long"),
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
  const router = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      role: "user",
      createdAt: new Date().toISOString(), // default createdAt to current date
      updatedAt: new Date().toISOString(), // default updatedAt to current date
      // This could be set to a UUID on the backend or handled by the database
    },
    validate: (value) => {
      const result = signUpSchema.safeParse(value);
      return result.success ? {} : result.error.flatten().fieldErrors;
    },
  });

  const handleSubmit = (values:any) => {
    console.log("Form values:", values.email);
    axios
      .post(
        "http://localhost:3000/auth/signup",
        {
          email: values?.email,
          password: values?.password,
          fullName: values?.fullName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("Post", res.data);
        toast.success("Sign-up successful! Redirecting to login...", {
          position: "top-right",
        });
        form.reset();
        router.push("/login");
      })
      .catch((error) => {
        console.error(
          "Post request failed:",
          error?.response?.data?.message || error.message
        );
        toast.error(error?.response?.data?.message || "Something went wrong!", {
          position: "top-right",
        });
      });
  };

  // A@asdfghjkl

  return (
    <>
      <ToastContainer />
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
              {...form.getInputProps("fullName")}
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
    </>
  );
}
