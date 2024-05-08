"use client";

import { Code } from "@phosphor-icons/react";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";

export default function Header() {
  return (
    <header className="flex border-b border-transparent rounded-md fixed bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 items-center p-3 justify-between w-full">
      <div className="flex text-lg">
        <span className="font-bold">Sheet-</span>
        <span className="text-orange-600 font-bold">
          HUB <sup className="text-gray-600 text-xs">TM</sup>
        </span>
      </div>
      {/* navbar */}
      <div className="flex gap-4 items-center justify-betweeḍṣśṣṣśśśḍśḍn ">
        {/* <a
          href="#"
          className="flex items-center justify-center bg-zinc-800 px-2 py-0.5 text-white rounded-full"
        >
          <GithubLogo size={16} />
          <span className="text-sm">Star Us on Github </span>
        </a> */}
        <a
          href="/about"
          className="text-black font-semibold rounded text-lg hover:underline hover:text-purple-900 "
        >
          About
        </a>
        {/* <a
          href="/profile"
          className="text-black rounded text-lg hover:underline hover:text-purple-900 "
        >
          Profile
        </a> */}

        <a
          href="/login"
          className="text-black border border-gray-400 rounded-full px-4  "
        >
          Login
        </a>
      </div>
    </header>
  );
}
