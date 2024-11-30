import { getLoggedInUser } from "@/lib/server/appwrite";
import { signUpWithGithub } from "@/lib/server/oauth";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default async function SignUpPage() {
  const user = await getLoggedInUser();
  if (user) redirect("/dashboard");

  return (
    <>
      <div className="grid place-items-center h-screen">
        <div className="w-96 h-72 shadow-lg rounded-lg grid place-content-center content-start p-10 gap-10">
          <h2 className="text-2xl font-bold text-center">Sign up</h2>
          <form action={signUpWithGithub}>
            <button
              type="submit"
              className="flex items-center text-xl bg-white border py-3 px-6 rounded-lg shadow-md"
            >
              <FcGoogle size={30} />
              Sign up with Google
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
