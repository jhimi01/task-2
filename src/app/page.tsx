import CustomForm from "./components/CustomForm/CustomForm";
import Output from "./Output/Output";

export default function Home() {
  return (
    <main className="wrapper gap-7 lg:flex">
      <div className="lg:w-[30%]">
        <CustomForm />
      </div>
      <div className="lg:w-[70%]">
        <Output />
      </div>
    </main>
  );
}
