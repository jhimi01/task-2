"use client";

import { useCallback } from "react";

// Helper function to parse cookies
const parseCookies = (): Record<string, string> => {
  return document.cookie.split("; ").reduce((acc, current) => {
    const [key, value] = current.split("=");
    acc[key] = decodeURIComponent(value || "");
    return acc;
  }, {} as Record<string, string>);
};

const useCookie = () => {
  // Function to set a cookie
  const setCookie = useCallback(
    (
      name: string,
      value: string,
      options?: { days?: number; secure?: boolean }
    ) => {
      let cookieString = `${name}=${encodeURIComponent(value)}`;
      if (options?.days) {
        const date = new Date();
        date.setDate(date.getDate() + options.days);
        cookieString += `; expires=${date.toUTCString()}`;
      }
      cookieString += "; path=/";
      if (options?.secure) {
        cookieString += "; secure";
      }
      document.cookie = cookieString;
    },
    []
  );

  // Function to get a cookie by name
  const getCookie = useCallback((name: string): string | undefined => {
    const cookies = parseCookies();
    return cookies[name];
  }, []);

  // Function to remove a cookie
  const removeCookie = useCallback((name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  }, []);

  return { setCookie, getCookie, removeCookie };
};

export default useCookie;
