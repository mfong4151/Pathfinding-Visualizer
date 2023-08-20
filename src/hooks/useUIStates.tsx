import React, { useState } from "react"
import { consoleContent } from "../types/objects";

type genericStates = {
    consoleContent:consoleContent,
    setConsoleContent:React.Dispatch<React.SetStateAction<consoleContent>>,
    isPlaying: boolean,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
    errors:string[],
    setErrors:React.Dispatch<React.SetStateAction<string[]>>,

}

const useUIStates = (): genericStates  => {

    const [consoleContent, setConsoleContent] = useState<consoleContent>([])
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([''])

    
  return {
        consoleContent,
        setConsoleContent,
        isPlaying,
        setIsPlaying,
        errors,
        setErrors
    }

  
}

export default useUIStates
