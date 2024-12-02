"use client";
import { useState } from "react";

const useCookie = (cookieName: string) => {
  // Function to get the cookie value by name
  const getCookie = (): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  // Function to set a cookie
  const setCookie = (value: string, days: number = 7) => {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000); // Set expiration time
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cookieName}=${value}; ${expires}; path=/`; // Set the cookie
  };

  // Function to remove a cookie
  const removeCookie = () => {
    document.cookie = `${cookieName}=; Max-Age=-99999999; path=/`; // Remove the cookie
  };

  const [cookieValue, setCookieState] = useState<string | null>(() => getCookie());

  return {
    cookieValue, // Current cookie value
    setCookie: (value: string) => {
      setCookie(value);
      setCookieState(value); // Update state
    },
    removeCookie: () => {
      removeCookie();
      setCookieState(null); // Clear state when removed
    },
  };
};

export default useCookie;
