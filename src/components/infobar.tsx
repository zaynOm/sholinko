import Link from "next/link";
import Button from "./ui/my-button";

export default function Infobar() {
  return (
    <div className="sticky top-0 right-0 flex h-16 border-b bg-white p-2 px-4">
      <Link href="/dashboard/links/new" className="ml-auto">
        <Button>Create Link</Button>
      </Link>
    </div>
  );
}
