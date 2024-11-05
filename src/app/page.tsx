import CustomForm from "./components/CustomForm/CustomForm";
import Output from "./Output/Output";

export default function Home() {
  return (
    <main className="wrapper gap-10 md:flex">
      <div className="md:w-[30%]">
        <CustomForm />
      </div>
      <div className="md:w-[70%]">
        <Output />
      </div>
    </main>
  );
}
