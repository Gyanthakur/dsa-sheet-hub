"use client";
import Table from "@/components/Ui/Table";
import { getToken } from "@/helper/tokenHandler";
import { questionProps } from "@/types/questions.types";
import { sheetProps } from "@/types/sheet.types";
import { Star } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import { use, useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const [sheet, setSheet] = useState<sheetProps>();
  const [questions, setQuestions] = useState<questionProps[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const response = await axios(
        process.env.NEXT_PUBLIC_API_URL +
          `/data/getsheetmanagamentdata/${params.slug}`,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      if (response.status === 200) {
        setQuestions(response.data.data.questions);
        setSheet(response.data.data.sheet);
        setSelected(response.data.data.selected);
        setLoading(false);
      } else {
        console.error("Error fetching data");
      }
    }
    fetchData();
  }, []);
  async function addHandler(qid: string) {
    setSelected((prev) => [...prev, qid]);
    try {
      const response = await axios.put(
        process.env.NEXT_PUBLIC_API_URL + "/sheets/addquestion",
        { sheetId: sheet?._id, questionId: qid },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
    } catch (error) {
      console.error("Error adding question to sheet");
    }
  }
  async function removeHandler(qid: string) {
    setSelected((prev) => prev.filter((id) => id !== qid));
    try {
      const response = await axios.put(
        process.env.NEXT_PUBLIC_API_URL + "/sheets/removequestion",
        { sheetId: sheet?._id, questionId: qid },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
    } catch (error) {
      console.error("Error removing question from sheet");
    }
  }
  if (loading)
    return (
      <main className="flex min-h-screen mt-16 overflow-hidden w-full flex-col  gap-4 sm:px-4 px-4">
        <p>Loading...</p>
      </main>
    );
  if (loading == false && sheet == null) return <div>Sheet Not Found</div>;
  return (
    <main className="flex min-h-screen mt-16 overflow-hidden w-full flex-col  gap-4 sm:px-4 px-4">
      {sheet && <Description sheet={sheet} />}
      {loading == false && (
        <Table
          questions={questions}
          setQuestions={setQuestions}
          selected={selected}
          setSelected={setSelected}
          addHandler={addHandler}
          removeHandler={removeHandler}
        />
      )}
    </main>
  );
}

function Description({ sheet }: { sheet: sheetProps }) {
  return (
    <div className="flex flex-col mt-4 w-full max-w-5xl">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">{sheet.name}</h1>
        <p className="sm:-mt-4">{sheet.description}</p>
        <div className="flex flex-col sm:-mt-1 gap-2">
          <div className="flex flex-col sm:flex-row gap-1 sm:items-center sm:justify-between">
            <div className="flex w-fit border border-gray-200 bg-gray-100 px-4 py-1 rounded-full justify-between items-center flex-row gap-1">
              <Star size={20} weight="fill" className="text-yellow-500" />
              <span className="text-base text-gray-700 font-semibold">
                {sheet.starCount}
              </span>
            </div>
          </div>
          <div>
            <p>
              You can add or remove questions from sheet by toggling the
              checkbox.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
