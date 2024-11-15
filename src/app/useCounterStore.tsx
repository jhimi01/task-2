import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the state and actions in TypeScript
interface CounterState {
  income: Array<{ id: number; category: string; amount: number; date: string }>;
  expenses: Array<{ id: number; category: string; amount: number; date: string }>;
  addIncome: (value: { category: string; amount: number; date: string }) => void;
  addExpenses: (value: { category: string; amount: number; date: string }) => void;
  editIncome: (value: { id: number; category: string; amount: number; date: string }) => void;
  editExpenses: (value: { id: number; category: string; amount: number; date: string }) => void;
  removeIncome: (id: number) => void;
  removeExpenses: (id: number) => void;
}

export const useCounterStore = create<CounterState>()(
  persist(
    (set, get) => ({
      income: [],
      expenses: [],

      // add income to the store
      addIncome: (value) => {
        set((state) => ({
          income: [...state.income, { ...value, id: Date.now() }],
        }));
      },

      // add expenses to the store
      addExpenses: (value) => {
        set((state) => ({
          expenses: [...state.expenses, { ...value, id: Date.now() }],
        }));
      },

      // edit income in the store
      editIncome: (value) => {
        set((state) => ({
          income: state.income.map((incomeItem) =>
            incomeItem.id === value.id ? { ...incomeItem, ...value } : incomeItem
          ),
        }));
      },

      // edit expenses in the store
      editExpenses: (value) => {
        set((state) => ({
          expenses: state.expenses.map((expenseItem) =>
            expenseItem.id === value.id ? { ...expenseItem, ...value } : expenseItem
          ),
        }));
      },

      // remove income from the store
      removeIncome: (id) => {
        set((state) => ({
          income: state.income.filter((item) => item.id !== id),
        }));
      },

      // remove expenses from the store
      removeExpenses: (id) => {
        set((state) => ({
          expenses: state.expenses.filter((expense) => expense.id !== id),
        }));
      },
    }),
    {
      name: "counter-store", // Unique name for local storage key
      storage: createJSONStorage(() => localStorage), // Specify local storage as storage medium
    }
  )
);
