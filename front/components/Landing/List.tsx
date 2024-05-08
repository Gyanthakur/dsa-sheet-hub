import { Atom } from "@phosphor-icons/react";

export default function List() {
  return (
    <div className="gap-8 grid w-full grid-cols-1 new md:grid-cols-2 lg:grid-cols-3 max-w-[1160px] mx-auto">
      <Card />
    </div>
  );
}

function Card() {
  return (
    <div className="hover:scale-110 transition-all duration-200 ease-in cursor-pointer mt-8 shadow-clay card  h-[230px] w-[305px] rounded-md border  flex items-center flex-col ">
      <h2 className="font-bold font-serif text-3xl text-blue-600">Array</h2>
      <h3>30 Question</h3>
      <div>
        <h1>Progress:</h1>
        <button className="bg-blue-500 hover:bg-blue-700 w-72 text-white font-bold py-1 px-4 rounded"></button>
      </div>
      <div className="flex flex-row mt-6 gap-40">
        <h2>1/30</h2>
        <button className="bg-green-400 hover:bg-green-600 w-full text-white font-bold py-1 px-4 rounded-lg">
          ✩stared
        </button>
      </div>
    </div>
  );
}
