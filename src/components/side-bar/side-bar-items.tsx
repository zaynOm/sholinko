"use client";

import Link from "next/link";
import { FaChartLine, FaLink, FaRegListAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { RxDashboard } from "react-icons/rx";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: <RxDashboard size={18} />,
  },
  {
    title: "Links",
    icon: <FaRegListAlt size={18} />,
  },
  {
    title: "Analytics",
    icon: <FaChartLine size={18} />,
  },
];

export default function SideBarItems() {
  const pathname = usePathname();

  return (
    <div className="px-4 py-6 flex-1">
      <span className="flex gap-4 text-xl font-bold px-4">
        <FaLink size={24} className="text-primary" />
        ShoLinko
      </span>
      <ul className="mt-10 space-y-1 hover:[&>li:not(:first-child)>a]:bg-purple-100">
        <li>
          <Link href="/dashboard/links/new">
            <Button className="px-4 py-2 w-full">Create Link</Button>
          </Link>
        </li>
        {sidebarItems.map((item, idx) => {
          const isActive =
            pathname ===
            `/dashboard${item.title === "Dashboard" ? "" : "/" + item.title.toLowerCase()}`;
          return (
            <li key={idx}>
              <Link
                href={`/dashboard/${item.title === "Dashboard" ? "" : item.title.toLowerCase()}`}
                className={`flex items-center gap-5 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 ${isActive ? "bg-purple-100" : ""}`}
              >
                {item.icon}
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
