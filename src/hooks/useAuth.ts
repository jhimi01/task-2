import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useCookie from "./useCookie";

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const login = async (credentials: LoginCredentials) => {
  const response = await fetch(`${BASE_URL}auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
};

const signup = async (userData: SignupData) => {
  const response = await fetch(`${BASE_URL}auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }

  return response.json();
};

const logout = async (token: string) => {
  const response = await fetch(`${BASE_URL}auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Send the token in the header
    },
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  return response.json();
};

export const useAuth = () => {
  const router = useRouter();
  const { setCookie, removeCookie, cookieValue } = useCookie("authToken");

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Store the token in the cookie
      setCookie(data.token);
      router.push("/");
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      // Store the token in the cookie
      setCookie(data.token);
      router.push("/");
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: (token: string) => logout(token),
    onSuccess: () => {
      removeCookie(); // Remove the token from the cookie
      router.push("/login");
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  return {
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isLoading,
    isSigningUp: signupMutation.isLoading,
    isLoggingOut: logoutMutation.isLoading,
    loginError: loginMutation.error,
    signupError: signupMutation.error,
    logoutError: logoutMutation.error,
    token: cookieValue, // Provide the token stored in cookies
  };
};
