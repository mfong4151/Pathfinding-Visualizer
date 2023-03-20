import { useState } from "react";
import Canvas from '../generalComponents/Canvas'

// interface Props{

// }

const LinkedLists: React.FC = ()=>{
    const [nodes, setNodes] = useState({});
  

    return(
      <div className='font-color'>

        <section className='banner'>

        </section>

        <div className='page-body'>
          <section id='page-left' className='tab-bg'>
            linky
          </section>
          <div className='adjbar'/>
          <section id='page-right' className='tab-bg udc'>
              <Canvas/>
          </section>  

        </div>
      
      </div>
    );

}


export default LinkedLists;