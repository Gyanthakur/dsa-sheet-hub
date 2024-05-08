import Banner from "@/components/Landing/Banner";
import Footer from "@/components/Landing/Footer";
import Header from "@/components/Landing/Header";
import TopSheets from "@/components/Landing/TopSheets";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-gradient-to-b from-blue-200 to-gray-50 via-bg-white overflow-hidden w-full flex-col items-center gap-4 sm:px-8 px-4">
      <Header />
      <Banner />
      <TopSheets />
      <Footer />
    </main>
  );
}
