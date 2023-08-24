import React, { useState } from "react"
import { consoleContent } from "../types/objects";
import { StateSetter } from "../types/setState";

type genericStates = {
    consoleContent:consoleContent,
    setConsoleContent:StateSetter<consoleContent>,
    isPlaying: boolean,
    setIsPlaying: StateSetter<boolean>,
    errors:string[],
    setErrors:StateSetter<string[]>,

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
