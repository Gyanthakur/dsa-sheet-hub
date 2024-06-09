"use client"
import Banner from "@/components/Landing/Banner";
import Footer from "@/components/Landing/Footer";
import Header from "@/components/Landing/Header";
import TopSheets from "@/components/Landing/TopSheets";
// import List from "@/components/List";
import CreateSheet from "@/components/Manage/CreateSheet";
import List from "@/components/Sheets/List";

export default function Home() {
  return (
    <main className="flex min-h-screen overflow-hidden w-full flex-col items-center gap-4 sm:px-8 px-4">
      <Banner />
      <TopSheets />
      <List />
      
    </main>
  );
}
