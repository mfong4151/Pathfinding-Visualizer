import './graphs.css'
import { useState, useRef, useEffect } from "react";
import GraphMatrix from './Matrix'
import { createNewMatrix } from "./utils/graphUtils";
import MatrixBanner from './MatrixBanner/MatrixBanner';
import { pos, startStop } from '../types/positions';
import UIConsole from '../generalComponents/UIConsole';
import { consoleContentState, errorsState } from '../types/state';
import { matrixItemObject } from '../types/objects';
import useUIStates from '../customHooks/useUIStates';
import useWindowSize from '../customHooks/useWindowSize';
import useMatrixStates from './customHooks/useMatrixStates';
import { windowDim } from '../types/windowDim';

const BREAK_POINT: number = 65; //break point of where we don't refacotr

const Graphs: React.FC = ()=>{
    const {matrixNodes, setMatrixNodes, matrixDim, setMatrixDim, matrix, setMatrix, startEndPos, setStartEndPos } = useMatrixStates();
    const {consoleContent,  setConsoleContent,  isPlaying,  setIsPlaying, errors,  setErrors} = useUIStates()
    
    const matrixState = {matrix, setMatrix};
    const windowDim: windowDim = useWindowSize()

    const consoleContentState: consoleContentState = {consoleContent, setConsoleContent}
    const errorsState:errorsState = {errors, setErrors};

    const pageLeftRef = useRef<any>();
    const pageRightRef = useRef<any>();
    const adjBarRef = useRef<any>();
    const matrixRef = useRef<any>();

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
    

    //Handles changes in the matrix sizing. if the window resizes, and the matrix is too large, then we cut it down such that its under the set width and height
    useEffect(()=>{
      

      if (pageRightRef.current.offsetWidth <= matrixRef.current.offsetWidth + BREAK_POINT && matrix[0].length >= 3){
        setMatrix(createNewMatrix(matrix.length, matrix[0].length -1))

      } else if (matrix[0].length < matrixDim.x ){

        setMatrix(createNewMatrix(matrix.length, matrix[0].length + 1))

        
      }

    },[windowDim.width])
   
    return(
      <div className='font-color'>

        <MatrixBanner 
                matrixNodeState={{matrixNodes, setMatrixNodes}}
                matrixState = {matrixState}
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
                    consoleContentState={{consoleContent, setConsoleContent}}
                    matrixRef = {matrixRef}
                    />}
            </section>  

        </div>
      
      </div>
    );

}


export default Graphs;