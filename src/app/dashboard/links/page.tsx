import { getLinksList } from "@/repositories/urlRepo";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function Page() {
  //FIX: slow down when switching to /links route
  const data = await getLinksList();
  return (
    <div className="container mx-auto">
      <div>
        <h2 className="text-3xl text-center font-bold py-10">ShoLinko links</h2>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
