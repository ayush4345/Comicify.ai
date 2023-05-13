import { useState } from "react"

export default function Test(){

    const [userInput, setUserInput] = useState("")

    const clickHandler = () => {

        const requestOptions = {
            method: "POST",
            body: JSON.stringify({userInput}),
            redirect: "follow",
        }

        fetch("http://localhost:3000/test", requestOptions)
        .then(response => response.json())
        .then(data => console.log(data))
    }


    return(
        <div className=" flex items-center justify-center h-screen">
            <h1 className=" m-4">Test</h1>
            <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} className=" border-2 border-black p-2"/>
            <button onClick={clickHandler} className=" border-2 border-black p-2">Send</button>
        </div>
    )
}