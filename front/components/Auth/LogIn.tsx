"use client";
import { Formik, FormikHelpers } from "formik";
import { useState, useEffect, Suspense } from "react";
import * as Yup from "yup";

import { getToken, setToken, removeToken } from "@/helper/tokenHandler";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheckered, ShieldStar } from "@phosphor-icons/react/dist/ssr";
import { useStore } from "@/store/useStore.store";
interface formValues {
  cred: string;
  password: string;
}
const SigninSchema = Yup.object().shape({
  cred: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callback_url = searchParams.get("callback_url");
  const [showPassword, setShowpassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [quickSignLoading, setQuickSignLoading] = useState<boolean>(false);
  const [error, setError] = useState<String>("");
  const initialValues: formValues = { cred: "", password: "" };
  // @ts-ignore
  const loggedInUser = useStore((state) => state.loggedInUser);
  // @ts-ignore
  const setLoggedInUser = useStore((state) => state.setLoggedInUser);
  async function handleSignin(values: formValues) {
    setError("");
    setLoading(true);
    try {
      const body = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cred: values.cred,
          password: values.password,
        }),
      };
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/auth/login",
        body
      );
      const data = await response.json();
      if (response.status === 200) {
        setToken(data.token);
        setLoggedInUser(data.user);
        if (callback_url) router.push(callback_url);
        else router.push("/");
      } else {
        setLoading(false);
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Client error, please try again later");
    }
  }
  useEffect(() => {
    const token = getToken();
    if (token) {
      // console.log(token);
      if (callback_url) router.push(callback_url);
      else router.push("/");
    }
  }, []);
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen justify-center items-center overflow-hidden w-full">
          <p> Loading...</p>
        </div>
      }
    >
      <main className="w-full font-sans h-[100vh] flex justify-center items-center">
        <div className="flex flex-col gap-8  sm:w-[380px] w-[100%] px-4 py-8 sm:rounded-2xl sm:border sm:shadow-sm border-gray-300">
          <div>
            <h2 className="text-4xl font-bold">Sign In</h2>
            <p className="text-sm font-semibold text-gray-600">
              Sign in to continue
            </p>
          </div>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={SigninSchema}
              onSubmit={(
                values: formValues,
                actions: FormikHelpers<formValues>
              ) => {
                handleSignin(values);
              }}
            >
              {(props) => (
                <form
                  className="flex flex-col gap-3"
                  onSubmit={props.handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Email/username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 16"
                        >
                          <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                          <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="cred"
                        name="cred"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.cred}
                        className="bg-gray-50 border focus:border-2 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Email / username"
                      />
                    </div>
                    {props.errors.cred && (
                      <div id="crederror" className="text-xs text-red-600">
                        {props.errors.cred}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 "
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg
                          className="text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          fill="currentColor"
                          viewBox="0 0 448 512"
                        >
                          <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                        </svg>
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.password}
                        name="password"
                        placeholder="Password"
                        className="bg-gray-50 border focus:border-2 outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  pl-10 "
                      />
                      <button
                        type="button"
                        onClick={() => setShowpassword(!showPassword)}
                        className="absolute inset-y-0  right-3 flex items-center pl-3.5 "
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 640 512"
                          >
                            <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 576 512"
                          >
                            <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {props.errors.password && (
                      <div id="passworderror" className="text-xs text-red-600">
                        {props.errors.password}
                      </div>
                    )}
                  </div>
                  <div className="mt-2">
                    <button
                      className={`w-full py-1.5 text-white  rounded-md ${
                        loading ? "bg-blue-100" : "bg-blue-500"
                      }`}
                      type="submit"
                      disabled={loading}
                    >
                      Sign in
                    </button>
                    <span className="block my-2 text-sm text-center text-gray-600">
                      Didn't have any account?{" "}
                      <a
                        className="font-semibold text-blue-500 underline text-md"
                        href="/signup"
                      >
                        Sign Up
                      </a>
                    </span>
                    {error && (
                      <div
                        id="error"
                        className="text-xs font-semibold text-center text-red-600"
                      >
                        {error}
                      </div>
                    )}
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </main>
    </Suspense>
  );
}
