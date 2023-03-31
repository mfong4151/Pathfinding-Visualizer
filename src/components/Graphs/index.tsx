import './graphs.css'
import { useState, useRef } from "react";
import GraphMatrix from './Matrix'
import { createNewMatrix } from "./utils/graphUtils";
import MatrixBanner from './MatrixBanner/MatrixBanner';
import { pos, startStop } from '../types/positions';
import { consoleContent } from '../types/objects';
import UIConsole from '../generalComponents/UIConsole';
import { consoleContentState, errorsState } from '../types/state';
import { matrixItemObject } from '../types/objects';
  
const Graphs: React.FC = ()=>{
    const [matrixNodes, setMatrixNodes] = useState<boolean>(true); //true === matrix, false === nodes
    const [matrixDim, setMatrixDim]  = useState<pos>({y: 30, x: 30});
    const [matrix, setMatrix] = useState<matrixItemObject[][]>(createNewMatrix(matrixDim.y, matrixDim.x));
    const [startEndPos, setStartEndPos] = useState<startStop>({start:{y: -1, x: -1}, end: {y: -1, x: -1}})
    const matrixState = {matrix, setMatrix};
    
    const [consoleContent, setConsoleContent] = useState<consoleContent>({})
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [errors, setErrors] = useState<Array<string>>([''])
    const consoleContentState: consoleContentState = {consoleContent, setConsoleContent}
    const errorsState:errorsState = {errors, setErrors};

    const adjBarRef = useRef(null)


    
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
            <section id='page-left' className='tab-bg'>
              <UIConsole consoleContent={consoleContent} isPlaying={isPlaying} errors={errorsState}
              
              />
            </section>

            <div id='adjbar' className='udc' ref={adjBarRef}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 14" width="2" height="14" fill="currentColor" className="text-gray-3 dark:text-dark-gray-3 transition -translate-y-6 group-hover:text-white dark:group-hover:text-white">
                <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 1)"/>
                <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 7)"/>
                <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 13)"/>
              </svg>
            </div>

            <section id='page-right' className='udc tab-bg'>
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