import './graphs.css'
import { useState } from "react";
import GraphMatrix from './Matrix'

// interface Props{

// }

const Graphs: React.FC = ()=>{
    const [matrixNodes, setMatrixNodes] = useState('matrix');
    const [matrixWidth, setmatrixWidth]  = useState(20);
    const [matrixHeight, setmatrixHeight]  = useState(20);
    const [matrix, setMatrix] = useState(Array(matrixHeight).fill(Array(matrixWidth).fill([])));
    const [nodes, setNodes] = useState([]);
    const matrixState = {matrix, setMatrix}

    return(
      <div className='font-color'>
        {/* probably want something here to change the x y of the rows */}
        <div className='banner'>

          <button
              className='sq-buttons banner-button udc'
              onClick={()=> setMatrixNodes(matrixNodes === 'matrix' ? 'nodes' : 'matrix')}
              >
            {`Change to ${matrixNodes === 'matrix' ? 'nodes' : 'matrix'}`}
          </button>
        </div>

        <div className='page-body'>
          <div id='page-left' className='tab-bg'>
            Test
          </div>
          <div className='adjbar'/>
          <div id='page-right' className='tab-bg'>
              {matrixNodes === 'matrix' && <GraphMatrix matrixState={matrixState}/>}
              {/* {matrixNodes === 'nodes' && <GraphNodes/>} */}

          </div>  

        </div>
      
      </div>
    );

}


export default Graphs;