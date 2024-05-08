"use client";

import React from "react";
import {
  FacebookLogo,
  GithubLogo,
  TwitterLogo,
  WhatsappLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="border-t-2 mt-8 py-2 w-full flex flex-col md:flex-row justify-between">
      <div className="">
        <div className="py-4 text-center">
          <div className="flex ">
            <span className="font-bold ml-1">Sheet-</span>
            <span className="text-orange-600 font-bold">
              HUB <sup className="text-gray-400">TM</sup>
            </span>
            <span className="ml-1 font-sans">
              {" "}
              © {new Date().getFullYear()}{" "}
            </span>
          </div>
        </div>
      </div>

      <div></div>

      <div className="flex sm:hidden flex-col justify-between">
        <h2 className="font-semibold">Contributors</h2>
        <ul className=" ">
          <li>
            <a
              className="underline text-blue-600"
              href="https://github.com/anurag-327/"
            >
              anurag-327
            </a>
          </li>
          <li className="underline text-blue-600">
            <a href="https://github.com/Gyanthakur/">Gyanthakur</a>
          </li>
          <li className="underline text-blue-600">
            <a href="https://github.com/Durgeshpratapsingh123/">
              Durgeshpratapsingh123
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
