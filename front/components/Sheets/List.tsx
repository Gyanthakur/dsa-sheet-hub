"use client";
import { Star } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import { useEffect, useState } from "react";
import SheetLoader from "../Ui/SheetLoader";
interface questionProps {
  addedBy: string;
  createdAt: string;
  difficulty: string;
  name: string;
  title: string;
  updatedAt: string;
  url1: string;
  url2?: string;
}
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
export default function List() {
  const [sheets, setSheets] = useState<SheetProps[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      (async function () {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/sheets/getsheets"
        );
        if (response.status === 200) {
          if (response.data) {
            setLoading(false);
            setSheets(response.data.sheets);
          }
        } else {
          setLoading(false);
          setSheets([]);
        }
      })();
    } catch (error) {
      setLoading(false);
      setSheets([]);
    }
  }, []);
  return (
    <div className="sm:max-w-4xl w-full mt-20">
      <h2 className="text-2xl font-semibold">Sheets</h2>
      {sheets.length > 0 && (
        <div className="text-start">Total {sheets.length} sheets found</div>
      )}
      {sheets.length === 0 && loading == false && (
        <div className="text-center">No sheets found</div>
      )}
      <div className="mt-4 gap-4 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {loading && (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <SheetLoader key={index} />
            ))}
          </>
        )}
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
    </div>
  );
}

export function Card(props: SheetProps) {
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
        href={`/sheets/${props.title}`}
        className="border-2 rounded-full w-full text-center float-end text-blue-600 border-gray-200 font-bold py-1 px-4 "
      >
        Solve Now
      </a>

      {/* <hr className="border-gray-200 mt-2" />
      <div className="text-sm ">
        Added By :{" "}
        <a
          href={`/user/${props.addedBy}`}
          className="text-blue-600 underline font-semibold"
        >
          {props.addedBy.username}
        </a>
      </div> */}
    </a>
  );
}
