import { useState } from "react";


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
          <div id='page-right' className='tab-bg'>
            test2
          </div>  

        </div>
      
      </div>
    );

}


export default LinkedLists;