import React, { useState, useEffect } from 'react'
import { windowDim } from '../../types/windowDim';




const useWindowSize = ():windowDim => {
    const [windowDim, setWindowDim] = useState<windowDim>({
        width: window.innerWidth,
        height:window.innerHeight
       })

        useEffect(()=>{
        const handleResize = ():void => {
          setWindowDim({
            width: window.innerWidth,
            height: window.innerHeight
          })
        };
        window.addEventListener('resize', handleResize)
        return () =>{
          window.removeEventListener('resize', handleResize)
        };
      },[])
      return windowDim;
}

export default useWindowSize
