import Link from "next/link";
import React from "react";
import { FaLink } from "react-icons/fa";
import Button from "./ui/my-button";
import { getLoggedInUser } from "@/repositories/authRepo";

export default async function Navbar() {
  const user = await getLoggedInUser();
  return (
    <header>
      <div className="container flex justify-between items-center h-16">
        <div>
          <Link href="/">
            <FaLink size={42} color="#9333ea" />
          </Link>
        </div>
        {/* <menu className="space-x-4 font-medium hidden sm:block"> */}
        {/*   <Link href="/Menu">Menu</Link> */}
        {/*   <Link href="/About">About</Link> */}
        {/*   <Link href="/Contact">Contact</Link> */}
        {/* </menu> */}
        {user ? (
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        ) : (
          <Link href="/sign-up">
            <Button>Sign up</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
