import './graphs.css'
import {FC, useRef, useEffect } from "react";
import Matrix from './Matrix'
import MatrixBanner from '../MatrixBanner/MatrixBanner';
import UIConsole from '../UIConsole';
import { consoleContentState, errorsState } from '../../types/state';
import useUIStates from '../../hooks/useUIStates';
import useMatrixStates from '../../hooks/useMatrixStates';
import BarSVG from './BarSVG';

//For any child components of matricies, if its not explicitly in the folder, that means we've taken it from its counterpart in Nodepage


const Matricies: FC = ()=>{
    const {matrixDim, setMatrixDim, matrix, setMatrix, startEndPos, setStartEndPos } = useMatrixStates();
    const {consoleContent,  setConsoleContent,  isPlaying,  setIsPlaying, errors,  setErrors} = useUIStates()
    const matrixStates = {matrix, setMatrix, matrixDim, setMatrixDim, startEndPos, setStartEndPos};
    const consoleContentState: consoleContentState = {consoleContent, setConsoleContent}
    const errorsState:errorsState = {errors, setErrors};
    const pageLeftRef = useRef<HTMLDivElement>(null);
    const adjBarRef = useRef<HTMLDivElement>(null);
    
    const matrixRef = useRef<any>();
    const matrixHolderRef = useRef<any>();

    

    useEffect(()=>{

      const resizeableLeft = pageLeftRef.current;
      const stylesLeft: CSSStyleDeclaration = window.getComputedStyle(resizeableLeft!);
      let widthLeft:number = parseInt(stylesLeft.width, 10)
      if(!resizeableLeft) return 

      let x:number = 0;
      
      const onMouseMoveLRResize =  (e:any) =>{
        const dx: number = e.clientX - x;
        widthLeft = widthLeft + (1.5 * dx);
        x = e.clientX
        resizeableLeft.style.width! = `${widthLeft}px`
      }
      
      const onMouseUpLRResize = (e:any) => document.removeEventListener("mousemove", onMouseMoveLRResize);

      const onMouseDownRightResize = (e:any) =>{

        x = e.clientX;
        resizeableLeft.style.left = stylesLeft.left
        resizeableLeft.style.right = '';
        document.addEventListener("mousemove", onMouseMoveLRResize);
        document.addEventListener("mouseup", onMouseUpLRResize);


      }

      const resizerRight = adjBarRef.current
      if(!resizerRight) return 
      resizerRight.addEventListener("mousedown", onMouseDownRightResize);

      return ()=> {
        resizerRight.removeEventListener("mousedown", onMouseDownRightResize)

      }
    }, [])

  
    
    return(
      <div id='page-main' className={`font-color ${isPlaying && 'unclickable'}`}>
        <MatrixBanner 
                matrixState = {matrixStates}
                matrixDimState= {{ matrixDim,setMatrixDim}}
                startEndPosState ={{ startEndPos, setStartEndPos}}
                consoleContentState = {consoleContentState}
                isPlayingState = {{isPlaying, setIsPlaying}}
                errorsState = {errorsState}
                matHolderDiv = {matrixHolderRef.current}
                matrixDiv = {matrixRef.current}
          />  

         <div className='page-body'>
            <section id='page-left' className='tab-bg section-border' ref={pageLeftRef} >
              <div className='udc-no-vertical console-holder'>
                <UIConsole consoleContent={consoleContent} isPlaying={isPlaying} errors={errorsState}/>
              </div>
              
            </section>
            <div id='adjbar' className='udc' ref={adjBarRef}>
                <BarSVG/>
             </div>
            <section id='page-right' className='udc-no-vertical tab-bg section-border' >
                  <Matrix 
                    matrixStates={matrixStates} 
                    consoleContentState={{consoleContent, setConsoleContent}}
                    matrixRef = {matrixRef}
                    matHolderRef = {matrixHolderRef}
                    isPlaying={isPlaying}
                    />
            </section>    

        </div>
      </div>
    );

}


export default Matricies;