import { fetchApi } from "@/lib/api/fetchApi";

export const getProducts = async () => {
    const products = await fetchApi<{ id: string; name: string }[]>({
      url: "/transaction",
      method: "GET",
    });
    console.log(products);
  };
  getProducts();
  