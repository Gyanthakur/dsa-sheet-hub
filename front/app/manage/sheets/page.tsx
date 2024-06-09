"use client";
import SheetLoader from "@/components/Ui/SheetLoader";
import { getToken } from "@/helper/tokenHandler";
import { Star } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
type questionProps = {
  _id: string;
  title: string;
  tags: string[];
  questions: string[];
  addedBy: string;
  url1: string;
  url2?: string;
  difficulty: string;
  createdAt: string;
  updatedAt: string;
};
interface SheetProps {
  _id: string;
  addedBy: { name: string; username: string };
  description: string;
  isPublic: boolean;
  name: string;
  questions: string[];
  title: string;
  starCount: number;
}
export default function Page() {
  const [sheets, setSheets] = useState<SheetProps[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/sheets/getusersheets",
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      if (response.status === 200) {
        setLoading(false);
        setSheets(response.data.sheets);
      } else {
        setLoading(false);
        console.error("Error fetching data");
      }
    }
    fetchData();
  }, []);
  if (loading)
    return (
      <div className="mt-16 text-center w-full">
        <p>Loading...</p>
      </div>
    );

  return (
    <main className="flex min-h-screen mt-16 overflow-hidden w-full flex-col  gap-4 sm:px-4 px-4">
      {sheets.length > 0 && loading == false ? (
        <>
          <Header count={sheets.length} />
          <div className="mt-4 gap-4 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 max-w-5xl">
            {!loading &&
              sheets.map((sheet, index) => (
                <Card
                  key={sheet._id}
                  title={sheet.title}
                  name={sheet.name}
                  questions={sheet.questions}
                  description={sheet.description}
                  isPublic={sheet.isPublic}
                  addedBy={sheet.addedBy}
                  starCount={sheet.starCount}
                  _id={sheet._id}
                />
              ))}
          </div>
        </>
      ) : (
        <div className="mt-10 bg-gray-100 border rounded-md w-full p-4 text-center">
          <p>No sheets found</p>
        </div>
      )}
    </main>
  );
}

function Header({ count }: { count: number }) {
  return (
    <div>
      <h2 className="text-3xl font-semibold">Questions</h2>
      <span className="text-sm text-gray-600">
        Total {count} sheets found.{" "}
      </span>
    </div>
  );
}

function Card(props: SheetProps) {
  return (
    <a
      href={`sheets/${props.title}`}
      className="cursor-pointer p-4 flex flex-col justify-start min-h-[200px] bg-gradient-to- from-blue-00 to-gray-blue-00 bg-white border-gray-300 shadow-sm rounded-md gap-2 border "
    >
      <div className="text-center">
        <h2 className="font-semibold  text-xl text-gray-800">{props.name}</h2>
        <p className="text-xs mt-1 w-full overflow-hidden text-ellipsis text-gray-600">
          {props.description.slice(0, 50)}
          {props.description.length > 50 ? "..." : ""}
        </p>
      </div>
      <div className="flex w-full mt-6 justify-center items-center flex-row gap-2">
        <div className="text-gray-800 font-semibold">
          <span>{props.questions.length} Questions </span>
        </div>
      </div>
      <div className="flex w-full justify-center items-center flex-row gap-2">
        <div>
          <Star size={20} weight="fill" className="text-yellow-500" />
        </div>
        <div className="text-sm text-gray-700 font-semibold">
          <span>{props.starCount}</span>
        </div>
      </div>

      <a
        href={`/manage/sheets/${props.title}`}
        className="border-2 rounded-full w-full text-center float-end text-blue-600 border-gray-200 font-bold py-1 px-4 "
      >
        Manage Sheet
      </a>
    </a>
  );
}
