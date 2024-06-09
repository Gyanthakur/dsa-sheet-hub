import { ArrowRight, FileCode } from "@phosphor-icons/react/dist/ssr";

export default function Banner() {
  return (
    <div className="flex flex-col text-center justify-center mt-16 sm:mt-14 items-center min-h-[450px] sm:min-h-[600px]">
      <div className="w-full flex flex-col gap-4">
        <div className="px-4 py-1 mx-auto transition duration-200 border border-blue-300 rounded-full hover:border-blue-500 w-fit">
          <p className="text-xs sm:text-sm font-semibold text-blue-700">
            Your Ultimate DSA Hub: All Sheets, One Place.
            <FileCode
              className="inline-block ml-1 -mt-1"
              size={20}
              weight="fill"
            />
          </p>
        </div>
        <h2 className="text-7xl font-bold font-sans ">
          <span>Sheet</span>
          <span className="text-blue-600 text-7xl">-</span>
          <span className="text-orange-500">HUB</span>
        </h2>
        <p className="text-center -mt-2 text-gray-700 font-semibold">
          Tailored Excellence: Craft Your Perfect DSA Sheet.{" "}
        </p>
        <div className="flex sm:flex-row flex-col justify-center sm:gap-4 gap-2 items-center">
          <a
            href="manage/sheets/create-sheet"
            className="bg-blue-500 w-fit text-white rounded-full px-4"
          >
            Create a sheet
          </a>
          <a
            href="/sheets"
            className="bg-black group w-fit text-white rounded-full px-4"
          >
            Explore sheets
            <ArrowRight
              size={20}
              className="group-hover:ml-2 ml-1 inline-block transition-all duration-400"
            />
          </a>
        </div>
      </div>
      {/* <div className="flex mt-10 justify-center items-center">
        <div className="w-80 h-80 flex justify-center items-center rounded-full bg-neutral-300">
          <div className="w-48 h-48 rounded-full flex justify-center items-center bg-violet-300">
            <div className="w-24 h-24 rounded-full flex justify-center items-center bg-blue-500">
              <button className=" text-white">400+ Questions</button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
