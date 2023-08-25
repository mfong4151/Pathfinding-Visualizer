import { useState } from "react"
import { StateSetter } from "../types/setState"

type states = {
    color1: string,
    color2: string,
    color3: string,
    color4: string,
    setColor1:StateSetter<string>,
    setColor2:StateSetter<string>,
    setColor3:StateSetter<string>,
    setColor4:StateSetter<string>,
    shortestPathColor:string,
    setShortestPathColor: StateSetter<string>,
    editColorModal: boolean,
    setEditColorModal: StateSetter<boolean>,
    customTransition: string,
    setCustomTransition: StateSetter<string>,
}

const useEditColorStates = (): states  => {

    const [color1, setColor1] = useState<string>(' #e2dbf8');
    const [color2, setColor2] = useState<string>('#4b0082');
    const [color3, setColor3] = useState<string>('#1837cf');
    const [color4, setColor4] = useState<string>('#87CEEB');
    const [color5, setColor5] = useState<string>('#270595');

    const [shortestPathColor, setShortestPathColor] = useState<string>('')
    const [editColorModal , setEditColorModal] = useState<boolean>(false);
    const [customTransition, setCustomTransition] = useState<string>('')
    
    
      
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
