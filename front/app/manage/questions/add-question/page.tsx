"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getToken } from "@/helper/tokenHandler";
import AddQuestion from "@/components/Manage/AddQuestions";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    if (getToken() === null) {
      router.push("/login?callback_url=/manage/questions/add-question");
    }
  }, []);
  return (
    <main className=" min-h-screen mb-10 overflow-hidden w-full gap-4 sm:px-8 px-4">
      <div className="grid gap-4 mx-auto mt-20 w-full md:max-w-7xl">
        <Header />
        <AddQuestion />
      </div>
    </main>
  );
}

function Header() {
  return (
    <div className="px-2 py-4">
      <h2 className="text-4xl font-semibold">Add New Question</h2>
      <p className="text-sm mt-1 text-gray-600">
        Add questions to your sheets. <br /> Fill out the form below to get
        started.
      </p>
      <div className="mt-4">
        <h4 className="font-[450] mb-1 text-lg">Guide to Adding a question</h4>
        <ol className="list-decimal ml-5 list-inside">
          <li>Name field represents the name of the Question</li>
          <li>URL 1 represents link of the question</li>
          <li>URL 2 is optional and is secondary link to the question</li>
          <li>Tags are used to categorize the question</li>
          <li>You can add custom tags to a problem</li>
          <li>
            You can add a question to a sheet after adding questions in the
            database
          </li>
        </ol>
      </div>
      <div>
        <a href="/manage/sheets" className="text-blue-500 mt-4 hover:underline">
          Add Questions to Sheet
        </a>
      </div>
    </div>
  );
}
