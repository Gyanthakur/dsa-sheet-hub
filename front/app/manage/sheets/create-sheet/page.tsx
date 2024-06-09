"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getToken } from "@/helper/tokenHandler";
import CreateSheet from "@/components/Manage/CreateSheet";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    if (getToken() === null) {
      router.push("/login?callback_url=/sheets/create-sheet");
    }
  }, []);
  return (
    <main className=" mb-10 min-h-screen overflow-hidden w-full gap-4 sm:px-8 px-4">
      <div className="grid gap-4 mx-auto mt-20 w-full md:max-w-7xl">
        <Header />
        <CreateSheet />
      </div>
    </main>
  );
}

function Header() {
  return (
    <div className="px-2 py-4">
      <h2 className="text-4xl font-semibold">Create New Sheet</h2>
      <p className="text-sm mt-1 text-gray-600">
        Create custom study sheets to organize your practice questions and study
        materials. <br /> Fill out the form below to get started.
      </p>
      <div className="mt-4">
        <h4 className="font-[450] mb-1 text-lg">Guide for creating sheet</h4>
        <ol className="list-decimal ml-5 list-inside">
          <li>Name field reprensts the name of the sheet</li>
          <li>Title represents unique identifier for a sheet</li>
          <li>Title should be unique and should not contain spaces</li>
          <ul className="ml-5">
            <li>"sde-sheet" or "graph-theory" ✅</li>
            <li>"sde sheet" or "graph theory" ❌ </li>
          </ul>
          <li>Description is optional</li>
          <li>You can add questions to sheet from edit section</li>
        </ol>
      </div>
    </div>
  );
}
