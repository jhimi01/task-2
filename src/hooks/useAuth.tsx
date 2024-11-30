import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface AuthPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name?: string;
  };
}

export default function useAuth() {
  const queryClient = useQueryClient();

  const login = useMutation<AuthResponse, Error, AuthPayload>(
    async (payload) => {
      const { data } = await axios.post(`${BASE_URL}login`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      return data;
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
      },
      onError: (error: string) => {
        console.error("Login failed:", error.message); // Log or handle error
      },
    }
  );

  return {
    login,
  };
}
