import { useState } from "react"

export default function Askgpt(){

    const [question, setQuestion] = useState("")
    const [output, setOutput] = useState("")

    const clickHandler = () => {

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({question}),
            redirect: "follow",
        }

        fetch("http://127.0.0.1:5000/askgpt", requestOptions)
        .then(response => response.json())
        .then(data => setOutput(data.output))
    }


    return(
        <div className=" flex items-center justify-center h-screen">
            <h1 className=" m-4">Ask me a question:</h1>
            <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} className=" border-2 border-black p-2"/>
            <button onClick={clickHandler} className=" border-2 border-black p-2">Send</button>

            
                <h1>
                    {output}
                </h1>
        </div>
    )
}