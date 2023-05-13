import { useState } from "react"

export default function Summariser(){

    const [userInput, setUserInput] = useState("")
    const [output, setOutput] = useState("")

    const clickHandler = () => {

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({userInput}),
            redirect: "follow",
        }

        fetch("http://127.0.0.1:5000/summariser", requestOptions)
        .then(response => response.json())
        .then(data => setOutput(data.output))
    }


    return(
        <div className=" flex items-center justify-center h-screen">
            <h1 className=" m-4">Test</h1>
            <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} className=" border-2 border-black p-2"/>
            <button onClick={clickHandler} className=" border-2 border-black p-2">Send</button>

            
                <h1>
                    {output}
                </h1>
        </div>
    )
}