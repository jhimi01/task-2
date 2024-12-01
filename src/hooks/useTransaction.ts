import { fetchApi } from './../lib/api/fetchApi';
import { useState, useEffect, useCallback } from "react";
// import { fetchApi } from "@/lib/api/fetchApi";

type Transaction = { id: string; name: string };

export const useTransaction = () => {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

const fetchTransaction = useCallback(async () => {
  setIsLoading(true);
  try{
    const data = await fetchApi<Transaction[]>({
      url: "/transaction",
      method: "GET",
    });
    setTransactions(data);
  } catch (err) {
    setError(err instanceof Error ? err.message : "Unknown error");
  } finally {
    setIsLoading(false);
  }
}, []);


// Add a transaction (POST request)
const addTransaction = useCallback(
  async (newTransaction: Omit<Transaction, "id">) => {
    setIsLoading(true);
    try {
      const data = await fetchApi<Transaction>({
        url: "/transaction",
        method: "POST",
        body: JSON.stringify(newTransaction),
      });
      setTransactions((prev) => (prev ? [...prev, data] : [data]));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  },
  []
);




useEffect(() => {
  fetchTransaction();
}, [fetchTransaction])

  return { transactions,  addTransaction, isLoading, error };
};
