import { ArrowArcRight, Crown, Star } from "@phosphor-icons/react/dist/ssr";

interface TopSheetsProps {
  id: string;
  rank: number;
  sheet: string;
  name: string;
  questionCount: number;
  description: string;
  addedBy: string;
  starCount: number;
  starred: boolean;
}
export default function TopSheets() {
  const sheets = [
    {
      id: "1",
      rank: 1,
      sheet: "Striver's Sheet",
      name: "Striver's A2Z DSA Sheet",
      questionCount: 450,
      description: "Striver's 450 DSA Questions",
      addedBy: "Striver",
      starCount: 450,
      starred: true,
    },
    {
      id: "2",
      sheet: "Love Babbar's Sheet",
      rank: 2,
      name: "Love Babbar's 450 DSA Sheet",
      questionCount: 450,
      description: "Love Babbar's 450 DSA Questions",
      addedBy: "Love Babbar",
      starCount: 100,
      starred: true,
    },
    {
      id: "3",
      rank: 3,
      sheet: "LeetCode 100 Sheet",
      name: "LeetCode 100 DSA Sheet",
      questionCount: 100,
      description: "LeetCode's 100 DSA Questions",
      addedBy: "LeetCode",
      starCount: 45,
      starred: false,
    },
  ];

  return (
    <div className="w-full  md:max-w-5xl">
      <div className="flex text-gray-600 gap-2 items-center ">
        <h2 className="text-3xl font-bold">Top Sheets</h2>
        <ArrowArcRight className="rotate-45" size={22} />
      </div>
      <div className="grid mt-10 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {sheets.map((sheet, index) => (
          <Card
            key={sheet.id}
            rank={sheet.rank}
            sheet={sheet.sheet}
            name={sheet.name}
            questionCount={sheet.questionCount}
            description={sheet.description}
            addedBy={sheet.addedBy}
            starCount={sheet.starCount}
            starred={sheet.starred}
            id={sheet.id}
          />
        ))}
      </div>
    </div>
  );
}

function Card(props: TopSheetsProps) {
  return (
    <div className="cursor-pointer p-4 flex flex-col justify-start min-h-[200px] border-gray-300 shadow-sm rounded-md gap-2 border-2 ">
      <div className="flex w-fit px-4 py-0.5 gap-2 items-center border border-zinc-300 rounded-full">
        <Crown size={20} weight="fill" className="text-yellow-500" />
        <span>#{props.rank}</span>
      </div>
      <div className="text-center">
        <h2 className="font-semibold  text-xl text-gray-800">{props.name}</h2>
        <p className="text-sm text-gray-600">{props.description}</p>
      </div>
      <div className="flex w-full mt-6 justify-center items-center flex-row gap-2">
        <div className="text-gray-800 font-semibold">
          <span>{props.questionCount} Questions </span>
        </div>
      </div>
      <div className="flex w-full justify-center items-center flex-row gap-2">
        <button>
          <Star size={20} weight="fill" className="text-yellow-500" />
        </button>
        <div className="text-sm text-gray-700 font-semibold">
          <span>Star- </span>
          <span>{props.starCount}</span>
        </div>
      </div>

      <button className="border-2 rounded-full w-full float-end text-blue-600 border-gray-200 font-bold py-1 px-4 ">
        Solve Now
      </button>

      {/* <hr className="border-gray-200 mt-2" />
      <div className="text-sm ">
        Added By :{" "}
        <a
          href={`/profile/${props.addedBy}`}
          className="text-blue-600 underline font-semibold"
        >
          {props.addedBy}
        </a>
      </div> */}
    </div>
  );
}
