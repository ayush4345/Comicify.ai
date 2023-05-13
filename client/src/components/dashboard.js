import Link from "next/link";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

export default function Dashboard() {
  const [userInput, setUserInput] = useState("");
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const fileTypes = ["PDF"];

  return (
    <main className="flex-col min-h-[80vh]">
      <div className="flex justify-center gap-5">
        <Link
          href="#"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 "
        >
          <div className="flex flex-col justify-between p-4 leading-normal">
            <label
              for="UserEmail"
              className="block text-xs font-medium text-gray-700"
            >
              Email
            </label>

            <textarea
              rows="4"
              cols="50"
              type="email"
              id="UserEmail"
              placeholder="john@rhcp.com"
              value={userInput}
              className="mt-1 w-full p-4 rounded-md border-gray-300 shadow-sm sm:text-sm focus:border-indigo-200"
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 "
        >
          <div className="flex flex-col justify-between p-4 leading-normal">
            <FileUploader
              multiple={true}
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />
            <p>
              {file ? `File name: ${file[0].name}` : ""}
            </p>
          </div>
        </Link>
      </div>
      <div className="flex justify-center gap-5">
        <Link
          href="#"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 "
        >
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Noteworthy technology acquisitions 2021
            </h5>
            <p className="mb-3 font-normal text-gray-700 ">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </div>
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 "
        >
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Noteworthy technology acquisitions 2021
            </h5>
            <p className="mb-3 font-normal text-gray-700 ">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}
