import { create } from "zustand";

import Swal from "sweetalert2";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the state and actions in TypeScript
interface CounterState {}

export const useCounterStore = create(
  persist((set, get) => ({
    income: [],
    expenses: [],

    // add income to the localStorage
    addIncome: (value) => {
      set((state) => ({
        income: [...state.income, { ...value, id: Date.now() }],
      }));
    },

    // add expenses to the localStorage
    addExpenses: (value) => {
      set((state) => ({
        expenses: [...state.expenses, { ...value, id: Date.now() }],
      }));
    },

    // edit data from income
    editIncome: (value) => {
      set((state) => ({
        income: state.income.map((incomeitems) =>
          incomeitems.id === value.id
            ? { ...state.income, value }
            : state.income
        ),
      }));
    },

    // edit data from expenses
    editExpenses: (value) => {
      set((state) => ({
        expenses: state.expenses.map((expense) =>
          expense.id === value.id ? { ...state.income, value } : state.income
        ),
      }));
    },

    // remove income from the localStorage
    removeIncome: (id: number) => {
      set((state) => ({
        income: state.income.filter((item) => item.id !== id),
      }));
    },

    // remove expenses from the localStorage
    removeExpenses: (id: number) => {
      set((state) => ({
        expenses: state.expenses.filter((expense) => expense.id !== id),
      }));
    },
  }))
);

// export default useCounterStore;
