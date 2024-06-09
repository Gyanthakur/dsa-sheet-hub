"use client";
interface loggedInUserType {
  username: string;
  avatar: string;
  createdAt: string;
  email: string;
  name: string;
  verificationStatus: boolean;
  admin: boolean;
}
import { getToken, removeToken } from "@/helper/tokenHandler";
import { useStore } from "@/store/useStore.store";
import {
  CaretUp,
  CirclesThreePlus,
  Gear,
  House,
  Question,
  SignOut,
} from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import { get } from "http";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SessionStatus() {
  // @ts-ignore
  const loggedInUser = useStore((state) => state.loggedInUser);
  // @ts-ignore
  const setLoggedInUser = useStore((state) => state.setLoggedInUser);
  const [dropdown, setDropdown] = useState<boolean>(false);
  useEffect(() => {
    const token = getToken();
    if (token !== null) {
      (async function () {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/auth/getsession",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.status === 200) setLoggedInUser(response.data.user);
      })();
    }
  }, []);
  if (loggedInUser)
    return (
      <div className="flex gap-2 items-center">
        <Image
          loading="lazy"
          src={loggedInUser.avatar}
          alt={loggedInUser.username}
          width={30}
          height={40}
          className="rounded-full cursor-pointer"
          onClick={() => setDropdown(!dropdown)}
        />

        {dropdown && <DropDown user={loggedInUser} />}
      </div>
    );
  return (
    <div>
      <a
        href="/login"
        className="text-black border border-gray-400 rounded-full px-4  "
      >
        Login
      </a>
    </div>
  );
}

function DropDown({ user }: { user: loggedInUserType }) {
  function handleSignOut() {
    removeToken();
    window.location.reload();
  }
  return (
    <div className="absolute z-[200]  border flex flex-col top-10 w-[250px] min-h-[100px] right-2 bg-white px-4 py-6 rounded-md">
      <CaretUp
        className="absolute z-[200] -right-1 -top-4 "
        size={30}
        color="#ffffff"
        weight="fill"
      />

      <div className="flex flex-col ">
        <span className="text-base font-[500] ">
          {user.name ? user.name : user.username}
        </span>
        <span className="overflow-hidden text-xs text-gray-400 ">
          {user.email}
        </span>
      </div>
      {/* <hr className="w-full h-[1.5px] mt-4 bg-black rounded-full "></hr> */}
      <div className="flex flex-col gap-3">
        <a href="/" className="flex items-center gap-1 mt-4">
          <House size={18} weight="regular" />
          Home
        </a>
        <a href="#" className="flex items-center gap-1 ">
          <CirclesThreePlus size={18} />
          Create Sheet
        </a>
        <a href="/playground" className="flex items-center gap-1">
          <Question size={18} weight="regular" />
          Add Questions
        </a>
        <a href="/account" className="flex items-center gap-1">
          <Gear size={18} weight="regular" />
          Account
        </a>
        <button onClick={handleSignOut} className="flex items-center gap-1">
          <SignOut size={18} weight="regular" />
          Log Out
        </button>
      </div>
    </div>
  );
}
