import React, { useState } from "react"
import { setBoolean, setString } from "../types/setState"

type states = {
    startColor: string,
    setStartColor:  setString,
    shortestPathColor:string,
    setShortestPathColor: setString,
    editColorModal: boolean,
    setEditColorModal: setBoolean,
    endColor : string,
    setEndColor: setString,
    customTransition: boolean,
    setCustomTransition: setBoolean,
}

const useEditColorStates = (): states  => {

    const [startColor, setStartColor] = useState<string>('')
    const [shortestPathColor, setShortestPathColor] = useState<string>('')
    const [editColorModal , setEditColorModal] = useState<boolean>(false);
    const [endColor, setEndColor] = useState<string>('')
    const [customTransition, setCustomTransition] = useState<boolean>(false)
    
  return {
       
     startColor, 
     setStartColor,
     shortestPathColor, 
     setShortestPathColor,
     editColorModal , 
     setEditColorModal,
     endColor, 
     setEndColor,
     customTransition,
     setCustomTransition

    }

  
}

export default useEditColorStates
