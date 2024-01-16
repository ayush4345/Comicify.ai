import Link from "next/link";
import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import Lottie from "react-lottie-player";
import loader from '@/../../public/assets/loader.json';
import CustomizedSnackbars from "./Snackbar";
import Tooltip from '@mui/material/Tooltip';

export default function Dashboard() {
  const [userInput, setUserInput] = useState("");
  const [stableDiffusionKey, setStableDiffusionKey] = useState("");
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  const [loading, setLoading] = useState(false)
  const [cfgValue, setCfgValue] = useState(8)
  const [steps, setSteps] = useState(30)
  const [customizations, setCustomizations] = useState("")
  const [errMessage, setErrMessage] = useState("")
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.title = "Dashboard | ComicifyAI";
  }, []);

  const fileTypes = ["PDF"];

  const limitCharacters = (text) => {
    return (text.length <= 30) ? text : (text.slice(0, 120) + "...");
  };

  const submitHandler = async () => {
    try {
      setLoading(true)
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          'userInput': userInput,
          'cfgValue': cfgValue,
          'steps': steps,
          'customizations': customizations,
          'key': stableDiffusionKey
        }),
        redirect: "follow",
      }


      const response = await fetch("http://127.0.0.1:5000/", requestOptions)
      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'file.pdf'); // Specify the filename for the downloaded file
        document.body.appendChild(link);
        link.click();
        link.remove();

        setLoading(false)
        setUserInput("")
        setStableDiffusionKey("")

      } else {
        const err = await response.json()
        const message = limitCharacters(err.error)
        setErrMessage(message)
        setLoading(false)
        setOpen(true)
      }

    } catch (err) {
      setLoading(false)
    }

  }

  const clickHandler = () => {
    if (userInput.length == 0 || stableDiffusionKey.length == 0) {
      setErrMessage("Prompt or Stable Diffusion Key cannot be empty!")
      setOpen(true)
    } else {
      submitHandler();
    }
  }

  return (
    <main className="flex justify-center flex-col min-h-[80vh]">
      {loading
        ? <div className=" static backdrop-blur-sm min-h-screen flex items-center justify-center flex-col">
          <div className=" bg-white opacity-75 h-[38h] w-[38vh] rounded-lg">
            <Lottie loop animationData={loader} play className="h-[40vh]" />
          </div>
          <div className=" font-xl text-white font-semibold p-2">Comicifying...</div>
          <div className=" font-xl text-white font-semibold p-2">It might take upto a minute, so please be patient</div>
        </div>
        : <div className="flex justify-center gap-5">
          <section
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 h-[550px] w-[600px] m-4"
          >
            <div className="flex flex-col h-full w-full p-4 leading-normal ">

              <label
                for="UserMessage"
                className="block text-xs font-medium text-gray-700"
              >
                Prompt*
              </label>
              <textarea
                rows="4"
                cols="50"
                type="text"
                id="UserMessage"
                placeholder="Write a clear and descriptive message about what you would like to comicify. Check the Examples if you'd like to get some inspiration!"
                value={userInput}
                className="mt-1 w-full p-4 rounded-md border-gray-300 shadow-sm sm:text-sm focus:border-indigo-200 h-full"
                onChange={(e) => setUserInput(e.target.value)}
              />
              <label
                for="customizations"
                className="block text-xs font-medium text-gray-700 mt-2"
              >
                Style of the comic
              </label>
              <textarea
                rows="2"
                cols="50"
                id="customizations"
                type="text"
                placeholder="Enter your favourite comic style like DC, Marvel, Anime or get creative!"
                value={customizations}
                onChange={(e) => setCustomizations(e.target.value)}
                className="mt-1 w-full p-3 rounded-md border-gray-300 shadow-sm sm:text-sm focus:border-indigo-200 md:overflow-hidden"
              >
              </textarea>
              
              <label
                for="stableDiffusionKey"
                className="block text-xs font-medium text-gray-700 mt-2"
              >
                <span className="md:flex grid flex-row justify-between">Stable Diffusion Key*<span className="p-1 text-gray-400 font-thin italic">You can get a key following the instructions <a href="https://beta.dreamstudio.ai/account" target="_blank" className="underline text-red-600 hover:text-red-700 transition duration-100">here</a></span></span>
              </label>
             
              <Tooltip title="Don't worry, your keys are encrypted and not saved :)" placement="bottom-start" arrow disableFocusListener>
                  <input
                    
                    id="stableDiffusionKey"
                    type="password"
                    placeholder="Enter your stable diffusion key (e.g., sk-C2Y**************Pjr)"
                    value={stableDiffusionKey}
                    onChange={(e) => setStableDiffusionKey(e.target.value)}
                    className="mt-1 w-full p-3 rounded-md border-gray-300 shadow-sm sm:text-sm focus:border-indigo-200 overflow-hidden"
                  >
                  </input>
              </Tooltip>

              <div className="flex gap-4 mt-4">
                <span className="w-full">
                  <label for="cfg_scale" class=" mb-2 text-sm font-medium text-gray-900">CFG Scale{' '}{cfgValue}</label>
                  <input id="cfg_scale" type="range" min="0" max="10" value={cfgValue} step="1" class="w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer " onChange={(e) => setCfgValue(e.target.value)} />
                </span>
                <span className="w-full">
                  <label for="steps" class=" mb-2 text-sm font-medium text-gray-900 ">Steps{' '}{steps}</label>
                  <input id="steps" type="range" min="1" max="100" value={steps} step="10" class="w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer" onChange={(e) => setSteps(e.target.value)} />
                </span>
              </div>
              <button className="bg-teal-600 text-white py-2 px-4 rounded-full drop-shadow-2xl font-poppins text-bold mt-6 " onClick={() => clickHandler()}>
                Submit
              </button>
            </div>


          </section>

        </div>
      }
      <div>
        <CustomizedSnackbars open={open} setOpen={setOpen} message={errMessage} />
      </div>
    </main>
  );
}

