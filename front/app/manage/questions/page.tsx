"use client";
import Table from "@/components/Ui/Table";
import { getToken } from "@/helper/tokenHandler";
import { questionProps } from "@/types/questions.types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [questions, setQuestions] = useState<questionProps[]>([]);
  const [notfound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/questions/getuserquestions",
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        if (response.status === 200) {
          setLoading(false);
          setQuestions(response.data.questions);
        } else if (response.status === 404) {
          setLoading(false);
          setNotFound(true);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    })();
  }, []);
  if (loading)
    return (
      <div className="mt-16 text-center w-full">
        <p>Loading...</p>
      </div>
    );

  function addHandler(qid: string) {
    setSelected((prev) => [...prev, qid]);
  }
  function removeHandler(qid: string) {
    setSelected((prev) => prev.filter((id) => id !== qid));
  }
  return (
    <main className="flex min-h-screen mt-16 overflow-hidden w-full flex-col  gap-4 sm:px-4 px-4">
      {questions.length > 0 && loading == false ? (
        <>
          <Header count={questions.length} />
          <Table
            selected={selected}
            setSelected={setSelected}
            addHandler={addHandler}
            removeHandler={removeHandler}
            questions={questions}
            setQuestions={setQuestions}
            Header={
              <TableHeader
                questions={questions}
                count={questions.length}
                setSelected={setSelected}
                selected={selected}
                setQuestions={setQuestions}
              />
            }
          />
        </>
      ) : (
        <div className="mt-10 bg-gray-100 border rounded-md w-full p-4 text-center">
          <p>No questions found</p>
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
        Total {count} questions found.{" "}
      </span>
    </div>
  );
}

function TableHeader({
  questions,
  setQuestions,
  selected,
  setSelected,
  count,
}: {
  questions: questionProps[];
  setQuestions: React.Dispatch<React.SetStateAction<questionProps[]>>;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  count: number;
}) {
  async function deleteQuestions() {
    if (selected.length === 0) return;
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/questions/deletequestions",
        { ids: selected },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      console.log(response);
      if (response.status === 200) {
        setSelected([]);
        setQuestions(questions.filter((q) => !selected.includes(q._id)));
      }
    } catch (error) {}
  }
  return (
    <div className="w-full flex justify-between gap-2 rounded-md mb-2 p-2 border bg-gray-100">
      <div className="flex gap-2 ml-10 items-center">
        <div>
          <input
            id="hs-table-checkbox-1"
            type="checkbox"
            className="border-gray-600 rounded text-blue-600 focus:ring-blue-500 h-4 w-4 mt-1 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
            checked={selected.length === count}
            onChange={(e) => {
              if (e.target.checked) {
                setSelected((prev) => questions.map((q) => q._id));
              } else {
                setSelected([]);
              }
            }}
          />
        </div>
        <div>
          <span className="text-gray-600 text-xs">
            {selected.length} / {count} selected
          </span>
        </div>
      </div>
      <div>
        <button
          onClick={deleteQuestions}
          className="px-2 py-1 bg-red-400 text-white rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
