import { useState } from "react";


// interface Props{

// }

const Trees: React.FC = ()=>{

    const [nodes, setNodes] = useState({});
  

    return(
      <div className='font-color'>

        <div className='banner'>
        BANNER HERE

        </div>

        <div className='page-body'>
          <div id='page-left' className='tab-bg'>
            Test
          </div>
          <div className='adjbar'/>
          <div id='page-right' className='tab-bg'>
            test2
          </div>  

        </div>
      
      </div>
    );

}


export default Trees;