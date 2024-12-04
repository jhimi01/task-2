"use client";
import useCookie from "@/hooks/useCookie";
import FinanceTabs from "./components/FinanceManager/FinanceTabs";
import Output from "./components/Output/Output";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { getCookie } = useCookie();
  const token = getCookie("accessToken");
  console.log("token", token);

  if (token) {
    router.push("/");
  } else {
    router.push("/login");
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
