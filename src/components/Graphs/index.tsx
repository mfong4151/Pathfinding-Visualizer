import './graphs.css'
import { useState, useRef, useEffect } from "react";
import GraphMatrix from './Matrix'
import { createNewMatrix } from "./utils/graphUtils";
import MatrixBanner from './MatrixBanner/MatrixBanner';
import { pos, startStop } from '../types/positions';
import { consoleContent } from '../types/objects';
import UIConsole from '../generalComponents/UIConsole';
import { consoleContentState, errorsState } from '../types/state';
import { matrixItemObject } from '../types/objects';
import useWindowSize from '../customHooks/useWindowSize';
  
const Graphs: React.FC = ()=>{
    const [matrixNodes, setMatrixNodes] = useState<boolean>(true); //true === matrix, false === nodes
    const [matrixDim, setMatrixDim]  = useState<pos>({y: 20, x: 20});
    const [matrix, setMatrix] = useState<matrixItemObject[][]>(createNewMatrix(matrixDim.y, matrixDim.x));
    const [startEndPos, setStartEndPos] = useState<startStop>({start:{y: -1, x: -1}, end: {y: -1, x: -1}})
    const matrixState = {matrix, setMatrix};
    const windowDim = useWindowSize()
    const [consoleContent, setConsoleContent] = useState<consoleContent>({})
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [errors, setErrors] = useState<Array<string>>([''])
    const consoleContentState: consoleContentState = {consoleContent, setConsoleContent}
    const errorsState:errorsState = {errors, setErrors};
    const pageLeftRef = useRef<any>();
    const pageRightRef = useRef<any>();
    const adjBarRef = useRef<any>();
    
    useEffect(()=>{
      const resizeableLeft = pageLeftRef.current;
      const stylesLeft: CSSStyleDeclaration = window.getComputedStyle(resizeableLeft!);
      let widthLeft:number = parseInt(stylesLeft.width, 10)

      let x:number = 0;
      
      const onMouseMoveLRResize =  (e:any) =>{
        const dx: number = e.clientX - x;
        widthLeft = widthLeft + dx;
        x = e.clientX
        resizeableLeft.style.width! = `${widthLeft}px`
      }
      
      const onMouseUpLRResize = (e:any) => document.removeEventListener("mousemove", onMouseMoveLRResize);

      const onMouseDownRightResize = (e:any) =>{
        x = e.clientX;
        resizeableLeft.style.left = stylesLeft.left
        resizeableLeft.style.right = null;
        document.addEventListener("mousemove", onMouseMoveLRResize);
        document.addEventListener("mouseup", onMouseUpLRResize);


      }

      const resizerRight = adjBarRef.current
      resizerRight.addEventListener("mousedown", onMouseDownRightResize);

      return ()=> {
        resizerRight.removeEventListener("mousedown", onMouseDownRightResize)

      }
    }, [])
    
    useEffect(()=>{
      console.log(windowDim.width)
    },[windowDim.width])
   
    return(
      <div className='font-color'>

        <MatrixBanner 
                matrixNodeState={{matrixNodes, setMatrixNodes}}
                matrixState = {{matrix, setMatrix}}
                matrixDimState= {{ matrixDim,setMatrixDim}}
                startEndPosState ={{ startEndPos, setStartEndPos}}
                consoleContentState = {consoleContentState}
                isPlayingState = {{isPlaying, setIsPlaying}}
                errorsState = {errorsState}    
          />  

        
         <div className='page-body'>
            <section id='page-left' className='tab-bg'ref={pageLeftRef} >
              <div className='udc-no-vertical'>

                <UIConsole consoleContent={consoleContent} isPlaying={isPlaying} errors={errorsState}/>
              </div>

              <div id='adjbar' className='udc' ref={adjBarRef}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 14" width="2" height="14" fill="currentColor" className="text-gray-3 dark:text-dark-gray-3 transition -translate-y-6 group-hover:text-white dark:group-hover:text-white">
                  <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 1)"/>
                  <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 7)"/>
                  <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 13)"/>
                </svg>
              </div>
            
            </section>

            <section id='page-right' className='udc tab-bg' ref={pageRightRef}>
                {matrixNodes && 
                  <GraphMatrix 
                    matrixState={matrixState} 
                    startEndState ={{startEndPos, setStartEndPos}}
                    consoleContentState={{consoleContent, setConsoleContent}}/>}
            </section>  

        </div>
      
      </div>
    );

}


export default Graphs;