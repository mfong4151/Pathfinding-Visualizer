import { useState } from "react";
import Canvas from '../generalComponents/Canvas'

// interface Props{

// }

const LinkedLists: React.FC = ()=>{
    const [nodes, setNodes] = useState({});
  

    return(
      <div className='font-color'>

        <div className='banner'>

        </div>

        <div className='page-body'>
          <div id='page-left' className='tab-bg'>
            linky
          </div>
          <div className='adjbar'/>
          <div id='page-right' className='tab-bg udc'>
              <Canvas/>
          </div>  

        </div>
      
      </div>
    );

}


export default LinkedLists;