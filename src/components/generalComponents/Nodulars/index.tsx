import { useEffect, useRef} from "react";
import DSACanvas from '../DSACanvas'
import { consoleContentState, errorsState } from "../../types/state";
import useUIStates from "../../customHooks/useUIStates";
import useWindowSize from "../../customHooks/useWindowSize";
import UIConsole from "../UIConsole";
import Banner from './Banner'

//"Nodular" just refers to anything dealing with Nodes

interface Props{
    type:string;
}
const BREAK_POINT: number = 65; //break point of where we don't resize

const Nodular: React.FC<Props> = ({type})=>{
  const { consoleContent, setConsoleContent, isPlaying, setIsPlaying, errors, setErrors } = useUIStates();
  const consoleContentState: consoleContentState = { consoleContent, setConsoleContent };
  const errorsState: errorsState = { errors, setErrors };
  const pageLeftRef = useRef<any>();
  const pageRightRef = useRef<any>();
  const adjBarRef = useRef<any>();
  const windowDim = useWindowSize();


  useEffect(() => {
    const resizeableLeft = pageLeftRef.current;
    const stylesLeft: CSSStyleDeclaration = window.getComputedStyle(resizeableLeft!);
    let widthLeft: number = parseInt(stylesLeft.width, 10);

    let x: number = 0;

    const onMouseMoveLRResize = (e: any) => {
      const dx: number = e.clientX - x;
      widthLeft = widthLeft + dx;
      x = e.clientX;
      resizeableLeft.style.width! = `${widthLeft}px`;
    };

    const onMouseUpLRResize = (e: any) => document.removeEventListener("mousemove", onMouseMoveLRResize);

    const onMouseDownRightResize = (e: any) => {
      x = e.clientX;
      resizeableLeft.style.left = stylesLeft.left;
      resizeableLeft.style.right = null;
      document.addEventListener("mousemove", onMouseMoveLRResize);
      document.addEventListener("mouseup", onMouseUpLRResize);
    };

    const resizerRight = adjBarRef.current;
    resizerRight.addEventListener("mousedown", onMouseDownRightResize);

    return () => {
      resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
    };
  }, []);


  //Untested use effect, this should resize the canvas 
  useEffect(() => {
    if (pageRightRef.current.offsetWidth <= BREAK_POINT) {
      pageRightRef.current.style.width = `${BREAK_POINT}px`;
    }
  }, [windowDim.width]);

  return(
    <div className='font-color'>
      <Banner/>

      
       <div className='page-body'>
          <section id='page-left' className='tab-bg'ref={pageLeftRef} >
            <div className='udc-no-vertical console-holder'>
              <UIConsole consoleContent={consoleContent} isPlaying={isPlaying} errors={errorsState}/>
            </div>
            <div id='adjbar' className='udc' ref={adjBarRef}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 14" width="2" height="14" fill="currentColor" className="text-gray-3 dark:text-dark-gray-3 transition -translate-y-6 group-hover:text-white dark:group-hover:text-white">
                <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 1)"/>
                <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 7)"/>
                <circle r="1" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 13)"/>
              </svg>
            </div>
          </section>

          <section id='page-right' className='udc tab-bg' ref={pageRightRef}>
               <DSACanvas/>
          </section>  

      </div>
    
    </div>
  );

}


export default Nodular;