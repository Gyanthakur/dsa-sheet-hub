import { useRouter } from "next/router";
import {
  Question,
  FileCode,
  FilePlus,
  Plus,
  PlusSquare,
  Users,
  User,
  X,
} from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef, useState } from "react";
export default function Sidebar() {
  const [pathname, setPathname] = useState("");
  const ref = useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPathname = window.location.pathname;
      setPathname(currentPathname);
    }
  }, []);
  const sidebarItems = [
    {
      href: "/manage/questions",
      icon: <Question className="mr-1 -mt-1 inline-block" size={20} />,
      label: "Questions",
    },
    {
      href: "/manage/sheets",
      icon: <FileCode className="mr-1 -mt-1 inline-block" size={20} />,
      label: "Sheets",
    },
    {
      href: "/manage/sheets/create-sheet",
      icon: <FilePlus className="mr-1 -mt-1 inline-block" size={20} />,
      label: "Create Sheet",
    },
    {
      href: "/manage/questions/add-question",
      icon: <PlusSquare className="mr-1 -mt-1 inline-block" size={20} />,
      label: "Add Questions",
    },
    {
      href: "/manage/account",
      icon: <User className="mr-1 -mt-1 inline-block" size={20} />,
      label: "Account",
    },
  ];
  function handleClick() {
    document.getElementById("sidebar")?.classList.toggle("hidden");
  }
  return (
    <>
      <button
        onClick={handleClick}
        className="px-2 py-2 md:hidden rounded-md border fixed top-16 bg-gray-100 right-5"
      >
        <X size={20} />
      </button>
      <div
        id="sidebar"
        ref={ref}
        className="w-[350px] min-h-screen mt-14 md:mt-0 md:block hidden absolute p-4 border-r md:static bg-white"
      >
        <h1 className="text-2xl md:mt-14 font-bold">Manage</h1>
        <ul className="mt-4 w-full px-4 text-gray-700">
          {sidebarItems.map((item, index) => (
            <li key={index} className="mb-2 grid ">
              <a
                href={item.href}
                className={`hover:bg-gray-100 p-2 rounded-md ${
                  pathname === item.href && "bg-gray-200"
                }`}
              >
                {item.icon}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
