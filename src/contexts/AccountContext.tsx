"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";

// Define interfaces for income and expense items
interface IncomeItem {
  id: number;
  incomecategory: string;
  incomeamount: number;
  incomedate: string;
}

interface ExpenseItem {
  id: number;
  category: string;
  amount: number;
  date: string;
}

interface AccountContextType {
  income: IncomeItem[];
  setIncome: React.Dispatch<React.SetStateAction<IncomeItem[]>>;
  expenses: ExpenseItem[];
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseItem[]>>;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

interface AccountProviderProps {
  children: ReactNode;
}

export const AccountProvider = ({
  children,
}: AccountProviderProps): JSX.Element => {
  const [income, setIncome] = useState<IncomeItem[]>([]);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);

  useEffect(() => {
    const savedIncome = JSON.parse(localStorage.getItem("income") || "[]");
    const savedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    setIncome(savedIncome);
    setExpenses(savedExpenses);
  }, []);

  useEffect(() => {
    localStorage.setItem("income", JSON.stringify(income));
  }, [income]);

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

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};

export default AccountContext;
