"use client";
import { ArrowArcRight, Crown, Star } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import { useEffect, useState } from "react";
import SheetLoader from "../Ui/SheetLoader";

interface TrendingSheetsProps {
  _id: string;
  rank?: number;
  title: string;
  name: string;
  questions: string[];
  description: string;
  addedBy: { username: string; _id: string };
  starCount: number;
}
export default function TopSheets() {
  const [trendingsheets, setTrendingSheets] = useState<TrendingSheetsProps[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async function () {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/sheets/trendingsheets"
      );
      if (response.status === 200) {
        setLoading(false);
        if (response.data.sheets.length > 0)
          setTrendingSheets(response.data.sheets);
      }
    })();
  }, []);
  return (
    <div className="w-full  md:max-w-5xl">
      <div className="flex text-gray-600 gap-2 items-center ">
        <h2 className="text-3xl font-bold">Top Sheets</h2>
        <ArrowArcRight className="rotate-45" size={22} />
      </div>
      <div className="grid mt-6 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {loading &&
          Array.from({ length: 3 }).map((_, index) => (
            <SheetLoader key={index} />
          ))}
        {loading === false && trendingsheets.length === 0 && (
          <div>No sheets found</div>
        )}
        {!loading &&
          trendingsheets.map((sheet, index) => (
            <Card
              key={sheet._id}
              rank={index + 1}
              title={sheet.title}
              name={sheet.name}
              questions={sheet.questions}
              description={sheet.description}
              addedBy={sheet.addedBy}
              starCount={sheet.starCount}
              _id={sheet._id}
            />
          ))}
      </div>
    </div>
  );
}

function Card(props: TrendingSheetsProps) {
  return (
    <div className="cursor-pointer p-4 flex flex-col justify-start min-h-[200px] border-gray-300 shadow-sm rounded-md gap-2 border-2 ">
      <div className="flex w-fit px-4 py-0.5 gap-2 items-center border border-zinc-300 rounded-full">
        <Crown size={20} weight="fill" className="text-yellow-500" />
        <span>#{props.rank}</span>
      </div>
      <div className="text-center">
        <h2 className="font-semibold  text-xl text-gray-800">{props.name}</h2>
        <p className="text-sm text-gray-600">
          {props.description.slice(0, 35)}
          {props.description.length > 40 ? "..." : ""}
        </p>
      </div>
      <div className="flex w-full mt-6 justify-center items-center flex-row gap-2">
        <div className="text-gray-800 font-semibold">
          <span>{props.questions.length} Questions </span>
        </div>
      </div>
      <div className="flex w-full justify-center items-center flex-row gap-2">
        <button>
          <Star size={20} weight="fill" className="text-yellow-500" />
        </button>
        <div className="text-sm text-gray-700 font-semibold">
          <span>Star- </span>
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
          href={`/profile/${props.addedBy}`}
          className="text-blue-600 underline font-semibold"
        >
          {props.addedBy.username}
        </a>
      </div> */}
    </div>
  );
}
