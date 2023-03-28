import './graphs.css'
import { useState } from "react";
import GraphMatrix from './Matrix'
import { createNewMatrix } from "./utils/graphUtils";
import MatrixBanner from './MatrixBanner/MatrixBanner';
import { pos, startStop } from '../types/positions';
import { consoleContent } from '../types/objects';
import UIConsole from '../generalComponents/UIConsole';

  
const Graphs: React.FC = ()=>{
    const [matrixNodes, setMatrixNodes] = useState<boolean>(true); //true === matrix, false === nodes
    const [matrixDim, setMatrixDim]  = useState<pos>({y: 30, x: 30});
    const [matrix, setMatrix] = useState<string[][]>(createNewMatrix(matrixDim.y, matrixDim.x));
    const [startEndPos, setStartEndPos] = useState<startStop>({start:{y: -1, x: -1}, end: {y: -1, x: -1}})
    const [consoleContent, setConsoleContent] = useState<consoleContent>({})
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const matrixState = {matrix, setMatrix};
    const [errors, setErrors] = useState<Array<string>>([''])


    return(
      <div className='font-color'>

        <MatrixBanner 
        
                matrixNodeState={{matrixNodes, setMatrixNodes}}
                matrixState = {{matrix, setMatrix}}
                matrixDimState= {{ matrixDim,setMatrixDim}}
                startEndPosState ={{ startEndPos, setStartEndPos}}
                setConsoleContent = {setConsoleContent}
                isPlayingState = {{isPlaying, setIsPlaying}}
                errorsState = {{errors, setErrors}}
                
          />  

        
         <div className='page-body'>
            <section id='page-left' className='tab-bg'>
              <UIConsole consoleContent={consoleContent} isPlaying={isPlaying}/>
            </section>

            <div className='adjbar'/>

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