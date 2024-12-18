import Navbar from "@/components/navbar";
import Button from "@/components/ui/my-button";
import { FaLink } from "react-icons/fa";

export default async function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div className="flex justify-center mt-48">
          <div className="flex flex-col items-center text-center gap-14">
            <div>
              <h1 className="text-6xl font-extrabold text-primary">
                Shorten, Share, Succeed. 🚀
              </h1>
              <h2 className="text-lg font-semibold text-slate-700">
                All the Tools You Need to Shorten and Track URLs.
              </h2>
            </div>
            <div className="p-16 shadow-2xl rounded-2xl w-full bg-card">
              <form className="bg-purple-100 h-20 rounded-lg flex items-center p-4 justify-between">
                <FaLink size={24} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="https://example.com/looooooong-url"
                  className="h-12 p-4 rounded-md text-lg flex-1 bg-transparent placeholder-slate-600 focus:outline-none"
                />
                <Button>Shorten</Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
