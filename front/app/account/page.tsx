"use client";
import UserInfo from "@/components/Profile/UserInfo";
import { getToken } from "@/helper/tokenHandler";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface props {
  username: string;
}
export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (token === null) {
      router.push(`/login?callback_url=account`);
    }
  }, []);
  return (
    <main className="flex min-h-screen overflow-hidden w-full flex-col items-center gap-4 sm:px-8 px-4">
      <UserInfo />
    </main>
  );
}
