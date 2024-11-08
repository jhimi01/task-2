"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";

// Define the shape of the context value
interface AccountContextType {
  income: number[];
  setIncome: React.Dispatch<React.SetStateAction<number[]>>;
  expenses: number[];
  setExpenses: React.Dispatch<React.SetStateAction<number[]>>;
}

// Create the context with an initial value of `undefined`
// so we can ensure it’s always used within a provider
const AccountContext = createContext<AccountContextType | undefined>(undefined);

interface AccountProviderProps {
  children: ReactNode;
}

// Define the provider component with an explicit return type of JSX.Element
export const AccountProvider = ({
  children,
}: AccountProviderProps): JSX.Element => {
  const [income, setIncome] = useState<number[]>([]);
  const [expenses, setExpenses] = useState<number[]>([]);

  useEffect(() => {
    const savedIncome = JSON.parse(localStorage.getItem("income") || "[]");
    const savedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    setIncome(savedIncome);
    setExpenses(savedExpenses);
  }, []);

  // Save income to localStorage when it updates
  useEffect(() => {
    localStorage.setItem("income", JSON.stringify(income));
  }, [income]);

  // Save expenses to localStorage when it updates
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <AccountContext.Provider
      value={{ income, setIncome, expenses, setExpenses }}
    >
      {children}
    </AccountContext.Provider>
  );
};

// Custom hook to use the AccountContext safely
export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};

export default AccountContext;
