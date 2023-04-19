import React, { useState } from "react"
import { setBoolean, setString } from "../types/setState"

type states = {
    color1: string,
    color2: string,
    color3: string,
    color4: string,
    setColor1:setString,
    setColor2:setString,
    setColor3:setString,
    setColor4:setString,
    shortestPathColor:string,
    setShortestPathColor: setString,
    editColorModal: boolean,
    setEditColorModal: setBoolean,
    customTransition: boolean,
    setCustomTransition: setBoolean,
}

const useEditColorStates = (): states  => {

    const [color1, setColor1] = useState<string>('')
    const [color2, setColor2] = useState<string>('')
    const [color3, setColor3] = useState<string>('')
    const [color4, setColor4] = useState<string>('')

    const [shortestPathColor, setShortestPathColor] = useState<string>('')
    const [editColorModal , setEditColorModal] = useState<boolean>(false);
    const [customTransition, setCustomTransition] = useState<boolean>(false)
    
  return {
       
     color1,
     color2,
     color3,
     color4,
     setColor1, 
    setColor2, 
    setColor3, 
    setColor4, 
     shortestPathColor, 
     setShortestPathColor,
     editColorModal , 
     setEditColorModal,
     customTransition,
     setCustomTransition

    }

  
}

export default useEditColorStates
