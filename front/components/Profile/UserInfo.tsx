import { useStore } from "@/store/useStore.store";

interface props {
  username: string;
}
export default function UserInfo() {
  // @ts-ignore
  const loggedInUser = useStore((state) => state.loggedInUser);
  if (loggedInUser === null)
    return (
      <div className="w-full flex min-h-screen justify-center items-center">
        Loading...
      </div>
    );
  return (
    <>
      {loggedInUser && (
        <div className="w-full">
          <div className="max-w-4xl py-4 mt-20 mx-auto  lg:py-14 bg-transparent shadow-md rounded-md">
            <div className="px-4 sm:px-12">
              <h1 className="text-3xl font-semibold flex justify-start">
                Profile
              </h1>
              <h1 className="mb-6">Manage your details:</h1>
            </div>
            <form className="bg-white px-4 sm:px-12">
              <div className="grid grid-flow-dense gap-4 ">
                <div className="inline-block mt-8">
                  <label htmlFor="full-name" className="inline-block text-sm">
                    Full Name:
                  </label>
                  <div className="sm:col-span-9">
                    <input
                      className="rounded-md outline-none resize-none ring-1 px-2 py-1.5 w-full "
                      type="text"
                      value={loggedInUser.name}
                      readOnly
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
                <div className="inline-block ">
                  <label htmlFor="user-name" className="inline-block text-sm">
                    @username:
                  </label>
                  <div className="">
                    <input
                      className="rounded-md outline-none resize-none ring-1 px-2 py-1.5 w-full "
                      type="text"
                      readOnly
                      value={loggedInUser.username}
                      placeholder="Enter your user name"
                    />
                  </div>
                </div>
                <div className="inline-block">
                  <label htmlFor="email" className="inline-block text-sm">
                    Email:
                  </label>
                  <div className="flex">
                    <input
                      className="rounded-md outline-none resize-none ring-1 px-2 py-1.5 w-full "
                      type="email"
                      value={loggedInUser.email}
                      readOnly
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="inline-block">
                  <label htmlFor="pasword" className="inline-block text-sm">
                    Password:
                  </label>
                  <div className="flex flex-col gap-4 rounded-lg">
                    <input
                      className="rounded-md outline-none resize-none ring-1 px-2 py-1.5 w-full "
                      type="password"
                      placeholder="Enter your old password"
                    />

                    <input
                      className="rounded-md outline-none resize-none ring-1 px-2 py-1.5 w-full "
                      type="password"
                      placeholder="Enter your new password"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center mt-5">
                <div className="bg-blue-500 hover:bg-blue-300 text-white w-fit px-4 py-2 rounded flex justify-center ">
                  <button type="submit" className="inline-block justify-end">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
