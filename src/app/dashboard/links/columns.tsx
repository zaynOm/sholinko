"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Clipboard, MoreHorizontal } from "lucide-react";

export type Link = {
  title: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  active: boolean;
};

export const columns: ColumnDef<Link>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "originalUrl",
    header: "Original ULR",
  },
  {
    accessorKey: "shortUrl",
    header: "Short URL",
    cell: ({ row }) => {
      const slug = row.getValue("shortUrl");
      const baseUrl = "https://sho.rt/";
      const shortUrl = baseUrl + slug;
      return (
        <div className="flex gap-2 items-center">
          {shortUrl}
          <Button
            variant="ghost"
            onClick={() => navigator.clipboard.writeText(shortUrl)}
          >
            <Clipboard />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
  },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => {
      const value = row.getValue("active");
      return value ? (
        <Badge variant="success">Acitve</Badge>
      ) : (
        <Badge variant="destructive">Inactive</Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const status = row.getValue("active");
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Actrion clicked")}>
              {status ? "Deactivate" : "Activete"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
