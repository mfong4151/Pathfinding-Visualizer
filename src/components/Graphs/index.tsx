import './graphs.css'
import { useState } from "react";
import GraphMatrix from './Matrix'
import { createNewMatrix } from "./utils/graphUtils";
import MatrixBanner from './MatrixBanner/MatrixBanner';

const Graphs: React.FC = ()=>{
    const [matrixNodes, setMatrixNodes] = useState(true); //true === matrix, false === nodes
    const [matrixDim, setMatrixDim]  = useState({y: 30, x: 30});
    const [matrix, setMatrix] = useState(createNewMatrix(matrixDim.y, matrixDim.x));
    const [nodes, setNodes] = useState([]);
    const matrixState = {matrix, setMatrix};
    
  

    return(
      <div className='font-color'>

        <MatrixBanner matrixBannerStates={{matrixNodes, setMatrixNodes, setMatrix, matrix, matrixDim, setMatrixDim}}/>  

        
         <div className='page-body'>
            <section id='page-left' className='tab-bg'>
              Test
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