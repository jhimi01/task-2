'use client'

import { useEffect, useState } from "react";
import FinanceTabs from "./components/FinanceManager/FinanceTabs";
import Output from "./components/Output/Output";
import { useTransaction } from "@/hooks/useTransaction";

export default function Home() {
  const { transactions, isLoading, error } = useTransaction();

  console.log(transactions)




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
