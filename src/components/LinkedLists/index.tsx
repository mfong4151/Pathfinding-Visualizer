import { useState, useRef} from "react";
import DSACanvas from '../generalComponents/DSACanvas/DSACanvas'

// interface Props{

// }

const LinkedLists: React.FC = ()=>{
    const [nodes, setNodes] = useState({});
    const adjBarRef = useRef<HTMLDivElement>(null)
    // const {offsetLeft} = adjBarRef?.current;
    // console.log(offsetLeft)

    return(
      <div className='font-color'>

        <section className='banner'>

        </section>

        <div className='page-body'>
          <section id='page-left' className='tab-bg'>
            linky
          </section>
          <div className='adjbar'/>
           {/* ref={adjBarRef}/> */}
          <section id='page-right' className='tab-bg udc'>
              <DSACanvas/>
          </section>  

        </div>
      
      </div>
    );

}


export default LinkedLists;