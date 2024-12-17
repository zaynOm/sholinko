import Infobar from "@/components/infobar";
import Sidebar from "@/components/sidebar";
import { getLoggedInUser } from "@/repositories/authRepo";
import { redirect } from "next/navigation";
import React from "react";

type props = {
  children: React.ReactNode;
};

export default async function Dashboard({ children }: props) {
  const user = await getLoggedInUser();
  if (!user) redirect("/");
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Infobar />
        <div className="p-16">{children}</div>
      </div>
    </div>
  );
}
