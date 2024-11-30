import { fetchApi } from "@/lib/api/fetchApi";

export const transaction = async () => {
    const products = await fetchApi<{ id: string; name: string }[]>({
      url: "/transaction",
      method: "GET",
    });
    console.log(products);
  };
  transaction();
  