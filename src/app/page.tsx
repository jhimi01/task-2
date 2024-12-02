
import { useEffect, useState } from "react";
import FinanceTabs from "./components/FinanceManager/FinanceTabs";
import Output from "./components/Output/Output";

export default function Home() {







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
