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
    const matrixState = {matrix, setMatrix}


    return(
      <div className='font-color'>
        {/* might wanna refactor this into its own component */}

        <MatrixBanner matrixBannerStates={{matrixNodes, setMatrixNodes, setMatrix, matrix, matrixDim, setMatrixDim


                                          }}/>  
      
        <div className='page-body'>
          <div id='page-left' className='tab-bg'>
            Test
          </div>
          <div className='adjbar'/>
          <div id='page-right' className='udc tab-bg'>
              {matrixNodes && <GraphMatrix matrixState={matrixState}/>}
              {/* {matrixNodes === 'nodes' && <GraphNodes/>} */}

          </div>  

        </div>
      
      </div>
    );

}


export default Graphs;