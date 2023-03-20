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
          <section id='page-left' className='tab-bg'>
            Test
          </section>
          <div className='adjbar'/>
          <section id='page-right' className='tab-bg'>
            test2
          </section>  

        </div>
      
      </div>
    );

}


export default Trees;