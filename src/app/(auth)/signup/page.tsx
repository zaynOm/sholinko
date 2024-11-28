import { getLoggedInUser } from "@/lib/server/appwrite";
import { signUpWithGithub } from "@/lib/server/oauth";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const user = await getLoggedInUser();
  if (user) redirect("/account");

  return (
    <>
      <form action={signUpWithGithub}>
        <button type="submit">Sign up with Google</button>
      </form>
    </>
  );
}
