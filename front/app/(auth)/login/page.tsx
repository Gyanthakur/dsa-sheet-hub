import Login from "@/components/Auth/LogIn";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="w-full font-sans h-[100vh] flex justify-center items-center">
        <Login />
      </main>
    </Suspense>
  );
}
