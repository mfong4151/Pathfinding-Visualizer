import { useState, useRef} from "react";
import DSACanvas from '../DSACanvas'


//"Nodular" just refers to anything dealing with nodes.

interface Props{
    type:string;
}

const Nodular: React.FC<Props> = ({type})=>{
    const [nodes, setNodes] = useState({});
    const adjBarRef = useRef<HTMLDivElement>(null)
    const adjBarLeft = adjBarRef?.current?.offsetLeft;

    return(
      <div className='font-color'>

        <section className='banner'>

        </section>

        <div className='page-body'>
          <section id='page-left' className='tab-bg'>
            {type}
          </section>
          <div className='adjbar'ref={adjBarRef}/>
          <section id='page-right' className='tab-bg udc'>
              <DSACanvas/>
          </section>  

        </div>
      
      </div>
    );

}


export default Nodular;