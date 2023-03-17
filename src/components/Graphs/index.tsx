import './graphs.css'
import { useState } from "react";
import GraphMatrix from './Matrix'
import { createNewMatrix } from "./utils/graphUtils";

// interface Props{

// }

const Graphs: React.FC = ()=>{
    const [matrixNodes, setMatrixNodes] = useState('matrix');
    const [matrixWidth, setmatrixWidth]  = useState(20);
    const [matrixHeight, setmatrixHeight]  = useState(20);
    const [matrix, setMatrix] = useState(createNewMatrix(matrixHeight, matrixWidth));
    const [nodes, setNodes] = useState([]);
    const matrixState = {matrix, setMatrix}

    return(
      <div className='font-color'>
        {/* might wanna refactor this into its own component */}
        <div className='banner'>

          <button   
              className='sq-buttons banner-button udc'
              onClick={()=> setMatrixNodes(matrixNodes === 'matrix' ? 'nodes' : 'matrix')}
              >
            {`Change to ${matrixNodes === 'matrix' ? 'nodes' : 'matrix'}`}
          </button>

          <button 
              className='sq-buttons banner-button udc'
              onClick={() => setMatrix(createNewMatrix(matrixHeight, matrixWidth))}
              >
              Reset Matrix
          </button>

          <form>
            <input placeholder='Set height'>
            
            </input>
          </form>
          <form>
            <input placeholder='Set width'>
            
            </input>
          </form>
        </div>

        <div className='page-body'>
          <div id='page-left' className='tab-bg'>
            Test
          </div>
          <div className='adjbar'/>
          <div id='page-right' className='udc tab-bg'>
              {matrixNodes === 'matrix' && <GraphMatrix matrixState={matrixState}/>}
              {/* {matrixNodes === 'nodes' && <GraphNodes/>} */}

          </div>  

        </div>
      
      </div>
    );

}


export default Graphs;