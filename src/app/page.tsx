"use client";
import useCookie from "@/hooks/useCookie";
import FinanceTabs from "./components/FinanceManager/FinanceTabs";
import Output from "./components/Output/Output";
import { useRouter } from "next/navigation";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()



export default function Home() {
  const router = useRouter();
  const { getCookie } = useCookie();
  const token = getCookie("accessToken");

  if (token) {
    router.push("/");
  } else {
    router.push("/login");
  }

  // const users = getData();
  // console.log(users);


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
