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
    <main className="flex justify-center flex-col min-h-[80vh]">
      <div className="flex justify-center gap-5">
        <section
          
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 h-[300px] w-[600px]"
        >
          <div className="flex flex-col h-full w-full p-4 leading-normal">
            <label
              for="UserMessage"
              className="block text-xs font-medium text-gray-700"
            >
              Prompt
            </label>

            <textarea
              rows="4"
              cols="50"
              type="email"
              id="UserMessage"
              placeholder="state your problem we help you learn but in fun way"
              value={userInput}
              className="mt-1 w-full p-4 rounded-md border-gray-300 shadow-sm sm:text-sm focus:border-indigo-200 h-full"
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
        </section>
        
      </div>
      
    </main>
  );
}
