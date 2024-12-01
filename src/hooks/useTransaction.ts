import { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api/fetchApi";

type Transaction = { id: string; name: string };

export const useTransaction = () => {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
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
    };

    fetchTransactions();
  }, []);

  return { transactions, isLoading, error };
};
