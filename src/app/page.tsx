'use client'

import { useEffect, useState } from "react";
import FinanceTabs from "./components/FinanceManager/FinanceTabs";
import Output from "./components/Output/Output";
import { getProducts } from "@/hooks/useTransaction";

export default function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error in fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("products", products);

  if (loading) {
    return <div>Loading...</div>;
  }



  return (
    <main className="wrapper gap-7 lg:flex">
      <div className="lg:w-[30%]">
        <FinanceTabs />
      </div>
      <div className="lg:w-[70%]">
        <Output />
      </div>
    </main>
  );
}
