import { getToken } from "@/helper/tokenHandler";
import axios from "axios";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
type FormData = {
  name: string;
  title: string;
  description?: string;
  isPublic?: boolean;
};
export default function CreateSheet() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    try {
      setError("");
      setLoading(true);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/sheets/create",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (response.status === 200) {
        router.push(`/sheets/edit/${response.data.sheet.title}`);
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
          Title
          <span className="ml-1 text-red-500">*</span>
        </label>
        <div className="grid w-full gap-1 sm:col-span-3">
          <input
            type="text"
            id="title"
            className="border border-gray-300 rounded-md px-2 py-1.5 outline-none resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out w-full"
            {...register("title", { required: true, pattern: /^[^\s]+$/ })}
          />
          {errors.title && (
            <span className="text-xs text-red-600">
              Required and must be unique (spaces not allowed)
            </span>
          )}
        </div>
      </div>
      <div className="grid gap-2 items-start grid-cols-1 sm:grid-cols-4 mt-4">
        <label htmlFor="description" className="col-span-1">
          Description
        </label>
        <textarea
          rows={2}
          className="border col-span-3 border-gray-300 rounded-md px-2 py-1.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out w-full"
          id="description"
          {...register("description")}
        />
      </div>
      <div className="flex  mt-4 gap-2 justify-start sm:items-center">
        <label htmlFor="isPublic" className="text-sm font-semibold">
          Public
        </label>
        <input
          type="checkbox"
          defaultChecked
          id="isPublic"
          className=""
          {...register("isPublic")}
        />
      </div>
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
