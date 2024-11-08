'use client'

import React, { createContext, useState, ReactNode } from "react";

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
export const AccountProvider = ({ children }: AccountProviderProps): JSX.Element => {
  const [income, setIncome] = useState<number[]>([]);
  const [expenses, setExpenses] = useState<number[]>([]);

  return (
    <AccountContext.Provider value={{ income, setIncome, expenses, setExpenses }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;

