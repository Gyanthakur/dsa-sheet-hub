import { getToken } from "@/helper/tokenHandler";
import axios from "axios";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import toast, { ToastBar, Toaster } from "react-hot-toast";
type FormData = {
  name: string;
  difficulty: string;
  url1: string;
  url2?: string;
};
export default function AddQuestion() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  async function onSubmit(data: FormData) {
    const x = { ...data, tags };
    try {
      setError("");
      setLoading(true);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/questions/create",
        x,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (response.status === 200) {
        reset();
        setLoading(false);
        setTags([]);
        toast.success("Added Successfully");
      } else {
        setLoading(false);
        setError(response.data.message);
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.error || error.message);
    }
  }

  return (
    <form className="mt-4 p-4" onSubmit={handleSubmit(onSubmit)}>
      <Toaster position="top-right" />
      <div className="grid grid-cols-1 sm:grid-cols-4 items-center">
        <label htmlFor="name" className="col-span-1">
          Name <span className="ml-1 text-red-500">*</span>
        </label>
        <div className="grid sm:col-span-3">
          <input
            type="text"
            id="name"
            className="border col-span-3 border-gray-300 rounded-md px-2 py-1.5 outline-none resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out w-full"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-xs text-red-600">This field is required</span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 mt-4 items-center">
        <label htmlFor="title" className="col-span-1">
          Difficulty
          <span className="ml-1 text-red-500">*</span>
        </label>
        <select
          id="difficulty"
          className="border col-span-3 border-gray-300 rounded-md px-2 py-1.5 outline-none resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 w-full"
          {...register("difficulty", { required: true })}
        >
          <option defaultChecked value="Easy">
            Easy
          </option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div className="grid gap-2 items-start grid-cols-1 sm:grid-cols-4 mt-4">
        <label htmlFor="description" className="col-span-1">
          URL 1<span className="ml-1 text-red-500">*</span>
        </label>
        <div className="col-span-3">
          <input
            type="text"
            id="url1"
            className="border col-span-3 border-gray-300 rounded-md px-2 py-1.5 outline-none resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out w-full"
            {...register("url1", { required: true, pattern: /https?:\/\/.+/ })}
          />{" "}
          {errors.url1 && (
            <span className="text-xs text-red-600">Unspecified format </span>
          )}
        </div>
      </div>
      <div className="grid gap-2 items-start grid-cols-1 sm:grid-cols-4 mt-4">
        <label htmlFor="description" className="col-span-1">
          URL 2
        </label>
        <div className="col-span-3">
          <input
            type="text"
            id="url2"
            className="border col-span-3 border-gray-300 rounded-md px-2 py-1.5 outline-none resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out w-full"
            {...register("url2", { pattern: /https?:\/\/.+/ })}
          />{" "}
          {errors.url2 && (
            <span className="text-xs text-red-600">Unspecified format </span>
          )}
        </div>
      </div>
      <InputTags tags={tags} setTags={setTags} />
      <div className="grid sm:grid-cols-2 mt-4 gap-2">
        {/* <button
          className="mt-4 w-full border bg-gray-200 py-2 rounded-lg
        "
          type="reset"
        >
          Reset
        </button> */}
        <div></div>
        <button
          className={` w-full py-2 rounded-lg ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"
          } text-white`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
      <div>
        {error && <span className="text-red-600 text-sm mt-4">{error}</span>}
      </div>
    </form>
  );
}

function InputTags({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  {
    const [newTag, setNewTag] = useState("");

    const handleAddTag = () => {
      if (newTag) {
        setTags((prevTags) => [...prevTags, newTag]);
        setNewTag("");
      }
    };

    return (
      <>
        <div className="mt-4">
          <label htmlFor="tags" className="col-span-1">
            Tags
          </label>
          <div className="mt-1">
            <div className="grid grid-cols-4">
              <input
                type="text"
                id="tags"
                className="border col-span-3 border-gray-300 rounded-md px-2 py-1.5 outline-none resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out w-full"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <button
                className="ml-2 bg-gray-100 border-2 px-2 py-1 rounded-md"
                onClick={handleAddTag}
                type="button"
              >
                Add
              </button>
            </div>
            <div className="mt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 bg-gray-200 rounded-md text-sm font-medium text-gray-800 mr-2"
                >
                  {tag}
                  <button
                    className="ml-2 text-red-500"
                    type="button"
                    onClick={() => {
                      setTags((prevTags) =>
                        prevTags.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}
