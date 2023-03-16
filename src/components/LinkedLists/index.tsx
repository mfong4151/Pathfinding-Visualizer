import { useState } from "react";


// interface Props{

// }

const LinkedLists: React.FC = ()=>{
    const [nodes, setNodes] = useState({});
  

    return(
      <div className='font-color'>

        <div id='banner'>
        BANNER HERE

        </div>

        <div className='page-body'>
          <div id='page-left' className='tab-bg'>
            Test
          </div>
          <div className='adjbar'>

          </div>
          <div id='page-right' className='tab-bg'>
            test2
          </div>  

        </div>
      
      </div>
    );

}


export default LinkedLists;