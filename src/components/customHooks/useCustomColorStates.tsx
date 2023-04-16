import React, { useState } from "react"

type states = {
    startColor: string,
    setStartColor:  React.Dispatch<React.SetStateAction<string>>,
    shortestPathColor:string,
    setShortestPathColor: React.Dispatch<React.SetStateAction<string>>,
    editColorModal: string,
    setEditColorModal: React.Dispatch<React.SetStateAction<string>>,
    endColor : string,
    setEndColor: React.Dispatch<React.SetStateAction<string>>,

}

const useEditColorStates = (): states  => {

    const [startColor, setStartColor] = useState<string>('')
    const [shortestPathColor, setShortestPathColor] = useState<string>('')
    const [editColorModal , setEditColorModal] = useState<string>('')
    const [endColor, setEndColor] = useState<string>('')

    
  return {
       
     startColor, 
     setStartColor,
     shortestPathColor, 
     setShortestPathColor,
     editColorModal , 
     setEditColorModal,
     endColor, 
     setEndColor

    }

  
}

export default useEditColorStates
