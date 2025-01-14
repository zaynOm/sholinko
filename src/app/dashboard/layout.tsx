import Infobar from "@/components/infobar";
import Sidebar from "@/components/sidebar";
import React from "react";

type props = {
  children: React.ReactNode;
};

export default async function Dashboard({ children }: props) {
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
