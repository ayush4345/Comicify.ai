import { useState } from "react"

export default function Test(){

    const [userInput, setUserInput] = useState("")


    return(
        <div className=" flex items-center justify-center h-screen">
            <h1 className=" m-4">Test</h1>
            <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} className=" border-2 border-black p-2"/>
        </div>
    )
}