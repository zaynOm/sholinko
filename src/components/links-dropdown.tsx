"use client";
import { Link } from "@/app/dashboard/links/columns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLink } from "@/store/slices/linkSlice";
import { AppDispatch, RootState } from "@/store/store";

export default function LinksDropdown({ links }: { links: Link[] }) {
  const dispatch = useDispatch<AppDispatch>();
  const selectedLink = useSelector(
    (state: RootState) => state.link.selectedLink,
  );

  function handleValueChange(value: string) {
    const selected = links.find((link) => link.title === value) || null;
    dispatch(setSelectedLink(selected));
  }

  return (
    <Select onValueChange={handleValueChange} value={selectedLink?.title}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Select a link" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Links</SelectLabel>
          {links.map((link) => (
            <SelectItem key={link.$id} value={link.title}>
              {link.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
