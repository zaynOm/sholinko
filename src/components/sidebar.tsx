import Link from "next/link";
import { FaLink, FaRegListAlt } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { TbLogout } from "react-icons/tb";
import { Separator } from "./ui/separator";
import { getLoggedInUser, logout } from "@/repositories/authRepo";

export default async function Sidebar() {
  const user = await getLoggedInUser();

  return (
    <div className="sticky top-0 left-0 flex h-screen flex-col justify-between border-e w-72 bg-white">
      <div className="px-4 py-6 flex-1">
        <span className="flex gap-4 text-xl font-bold px-4">
          <FaLink size={24} className="text-primary" />
          ShoLinko
        </span>
        <ul className="mt-10 space-y-1 hover:[&>li>a]:bg-purple-100">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center gap-5 rounded-lg px-4 py-2 text-sm font-medium text-gray-700"
            >
              <RxDashboard size={18} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/links"
              className="flex items-center gap-5 rounded-lg px-4 py-2 text-sm font-medium text-gray-700"
            >
              <FaRegListAlt size={18} />
              Links
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-5 rounded-lg px-4 py-2 text-sm font-medium text-gray-700"
            >
              <FaChartLine size={18} />
              Analytics
            </Link>
          </li>
        </ul>
      </div>
      <Separator />
      <div className="flex px-4 justify-between gap-4 my-4">
        {/* TODO: move to web based appwrite auth to get the user profile */}
        {/* <img src={img} alt="Profile picture" width={10} height={10} /> */}
        <div className="h-10 min-w-10 rounded-full bg-sky-500" />
        <div className="flex flex-col text-gray-500 text-sm">
          <span>{user?.name}</span>
          <span>{user?.email}</span>
        </div>
        <button onClick={logout}>
          <TbLogout size={24} className="text-red-400" />
        </button>
      </div>
    </div>
  );
}
