import { getLoggedInUser, logout } from "@/repositories/authRepo";
import { TbLogout } from "react-icons/tb";
import { Separator } from "../ui/separator";
import SideBarItems from "./side-bar-items";

export default async function Sidebar() {
  const user = await getLoggedInUser();

  return (
    <div className="sticky top-0 left-0 flex h-screen flex-col justify-between border-e w-72 bg-white">
      <SideBarItems />
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
