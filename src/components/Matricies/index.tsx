import './graphs.css'
import { useRef, useEffect } from "react";
import GraphMatrix from './Matrix'
import { createNewMatrix, transplantMatrix } from "./MatrixBanner/MatrixRemote/utils/graphUtils";
import MatrixBanner from './MatrixBanner/MatrixBanner';
import UIConsole from '../Nodulars/UIConsole';
import { consoleContentState, errorsState } from '../types/state';
import useUIStates from '../customHooks/useUIStates';
import useWindowSize from '../customHooks/useWindowSize';
import useMatrixStates from './customHooks/useMatrixStates';
import { windowDim } from '../types/windowDim';
import ChooseAlgoModal from '../Nodulars/Banner/ChooseAlgoModal';

//For any child components of matricies, if its not explicitly in the folder, that means we've taken it from its counterpart in Nodepage

const BREAK_POINT_MAX: number = 65; //break point of where we don't refacotr
const BREAK_POINT_MIN: number = 3;

const Matricies: React.FC = ()=>{
    const {matrixDim, setMatrixDim, matrix, setMatrix, startEndPos, setStartEndPos } = useMatrixStates();
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
      const rightDivHeight: number = pageRightRef.current.offsetHeight;
      const rightDivWidth: number = pageRightRef.current.offsetWidth;
      const matrixHeight: number = matrixRef.current.offsetHeight;
      const matrixWidth: number = matrixRef.current.offsetWidth;
      const tileHeightWidth: number = matrixRef.current.firstChild.firstChild.offsetWidth
      

      const overHeight:boolean = rightDivHeight <= matrixRef.current.offsetTop + matrixRef.current.offsetHeight + BREAK_POINT_MAX && matrix.length >= BREAK_POINT_MIN;
      const overWidth:boolean = rightDivWidth <= matrixRef.current.offsetWidth + BREAK_POINT_MAX && matrix[0].length >= BREAK_POINT_MIN;
      const canResizeX :boolean = matrix[0].length < matrixDim.x 
      const canResizeY :boolean = matrix.length < matrixDim.y

      transplantMatrix(40, 20, startEndPos)
      // if (overWidth || overHeight){
      //   setMatrix(createNewMatrix(matrix.length - (overHeight ? 1 : 0), matrix[0].length - (overWidth ? 1 : 0)))

      // } else if ( canResizeX || canResizeY ){

      //   setMatrix(createNewMatrix(matrix.length + (canResizeY ? 2: 0), matrix[0].length + (canResizeX ? 1:0)))

      // }

    },[windowDim.width, windowDim.height])
    
    useEffect(()=>{

    },[])


    return(
      <div className='font-color'>
        <MatrixBanner 
                matrixState = {matrixState}
                matrixDimState= {{ matrixDim,setMatrixDim}}
                startEndPosState ={{ startEndPos, setStartEndPos}}
                consoleContentState = {consoleContentState}
                isPlayingState = {{isPlaying, setIsPlaying}}
                errorsState = {errorsState}    
          />  

        
         <div className='page-body'>
            <section id='page-left' className='tab-bg'ref={pageLeftRef} >
              <div className='udc-no-vertical console-holder'>
                <UIConsole consoleContent={consoleContent} isPlaying={isPlaying} errors={errorsState}/>
              </div>
              <div id='adjbar' className='udc' ref={adjBarRef}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 2 14" 
                    width="2" 
                    height="14" 
                    fill="currentColor"
                    className="text-gray-3 dark:text-dark-gray-3 transition -translate-y-6 group-hover:text-white dark:group-hover:text-white">
                  <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 1)"/>
                  <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 7)"/>
                  <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 13)"/>
                </svg>
              </div>
            </section>

            <section id='page-right' className='udc-no-vertical tab-bg' ref={pageRightRef}>
                  <GraphMatrix 
                    matrixState={matrixState} 
                    startEndState ={{startEndPos, setStartEndPos}}
                    consoleContentState={{consoleContent, setConsoleContent}}
                    matrixRef = {matrixRef}
                    />
            </section>  

        </div>
      
      </div>
    );

}


export default Matricies;