import { Separator } from "@/components/ui/separator";
import { signUpWithGoogle } from "@/repositories/authRepo";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default async function SignUpPage() {
  return (
    <>
      <div className="grid place-items-center h-screen">
        <div className="w-[400px] h-72 shadow-lg rounded-lg bg-white flex flex-col items-center p-10 gap-7">
          <div>
            <h2 className="text-lg font-bold text-center">
              Create your account
            </h2>
            <span className="text-sm text-gray-500">
              Welcome! Please fill in the details to get started.
            </span>
          </div>
          <form action={signUpWithGoogle}>
            <button
              type="submit"
              className="flex items-center text-lg text-gray-700 gap-2 border py-3 px-6 rounded-lg shadow-md"
            >
              <FcGoogle size={24} />
              Continue with Google
            </button>
          </form>
          <Separator />
          <span className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/sign-in" className="hover:underline text-black">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
