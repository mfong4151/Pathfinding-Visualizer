import './graphs.css'
import { useEffect, useState } from "react";
import GraphMatrix from './Matrix'
import { createNewMatrix } from "./utils/graphUtils";
import MatrixBanner from './MatrixBanner/MatrixBanner';
import { pos } from '../types/positions';

const MAP_ALGO = {
                  
                  }



const Graphs: React.FC = ()=>{
    const [matrixNodes, setMatrixNodes] = useState<boolean>(true); //true === matrix, false === nodes
    const [matrixDim, setMatrixDim]  = useState<pos>({y: 30, x: 30});
    const [matrix, setMatrix] = useState<string[][]>(createNewMatrix(matrixDim.y, matrixDim.x));
    const [chosenAlgo, setChosenAlgo] = useState<string>('Choose your algorithim')
    const [nodes, setNodes] = useState<any[]>([]);
    const matrixState = {matrix, setMatrix};
    let itterator;

    useEffect(()=>{
      

    },[chosenAlgo])

    return(
      <div className='font-color'>

        <MatrixBanner matrixBannerStates={{matrixNodes, setMatrixNodes, setMatrix, matrix, matrixDim, setMatrixDim, chosenAlgo, setChosenAlgo}}/>  

        
         <div className='page-body'>
            <section id='page-left' className='tab-bg'>
            </section>
            <div className='adjbar'/>
            <section id='page-right' className='udc tab-bg'>
                {matrixNodes && <GraphMatrix matrixState={matrixState}/>}

            </section>  

        </div>
      
      </div>
    );

}


export default Graphs;