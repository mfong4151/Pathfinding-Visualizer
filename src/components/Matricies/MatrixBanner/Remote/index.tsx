import React, {useRef, useEffect} from 'react'
import './remote.css'
import { consoleContentState, matrixState } from '../../../types/state';
import { startStop } from '../../../types/positions';
import { itterator, } from '../../../types/itterator';
import { consoleContent, matrixItemObject } from '../../../types/objects';
import assignActiveItterator from './utils/assignActiveItter';
import { styleElement, styleShortestPath } from '../../utils/matrixStyling';

interface Props{
    chosenAlgo: string;
    matrixState: matrixState;
    startEndPos: startStop;
    consoleContentState: consoleContentState
    isPlaying: boolean,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
}


const Remote:React.FC<Props> = ({chosenAlgo, matrixState, startEndPos,  consoleContentState, isPlaying, setIsPlaying}) => {
  const {setConsoleContent} = consoleContentState;

  const currIttr = useRef<itterator>(null);
  const allowSetIttr = useRef<boolean>(true);
  const {matrix, setMatrix} = matrixState;
    
  let coords :number[] = [-1, -1];

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    const buttonId = e.currentTarget.id;
    const newConsoleContent: consoleContent = {};
    const activeIttr = currIttr.current;

    if (!activeIttr) {
      newConsoleContent['msg'] = 'You need to select an algo!'
      setConsoleContent(prev => newConsoleContent)
      return 
    }

    
    //used with the reset button 
   const resetMatrixItterator = ():void => {
    const exclusions = new Set(['s', 'w', 'e']);

    for(let i:number = 0; i < matrix.length; i++)
      for(let j:number = 0; j < matrix[0].length; j++){
        if (exclusions.has(matrix[i][j].val)) continue;
        document.getElementById(`cell-${j}-${i}`)!.className = 'tile udc';

      }

      currIttr.current = assignActiveItterator(chosenAlgo, startEndPos, matrixState.matrix);
  }

    const itterateForward = ():void =>{
      
      if(!activeIttr.isValidNext()) {
         const invalidPos:number[] = activeIttr.discardInvalidNode()!
        
         newConsoleContent['msg'] = `At this point, the node ${invalidPos[0]},${invalidPos[1]} was already visited, so we don't revisit it `

      } else  {
        coords = activeIttr.next()
        if (!activeIttr.isStart(coords) && !activeIttr.isEnd(coords)) styleElement(coords, 'visited-1');
        }

    }

    const play = ():void  =>{
      const res:matrixItemObject[] = activeIttr.preformFullAlgo()
      for(let i:number = 0; i < res.length; i ++){
        const node:matrixItemObject = res[i];
        if(!activeIttr.isStart(node.pos) && !activeIttr.isEnd(node.pos)) styleElement(node.pos, 'visited-1', i)
      }
      styleShortestPath(activeIttr.generateShortestPath())

    }



    switch (buttonId) {
      case 'reset':
        newConsoleContent['resetting'] = `Resetting the board so you can play everything again :3`
        resetMatrixItterator();
        break;

      case 'play':
        newConsoleContent['playing'] = `Currently showing the playthrough for ${chosenAlgo}`
        play()

        break;

      case 'pause':
        setIsPlaying(prev => !isPlaying)

        break;

      case 'fast-forward':
        if(!activeIttr.isEnd(coords)) itterateForward();
        break;
      case 'skip-forward':
        // handle skip forward button click
        break;
      default:
        break
    }

    if(newConsoleContent) setConsoleContent(prev => newConsoleContent)
    allowSetIttr.current = false;
    return
};

  useEffect(()=>{
    
    if(allowSetIttr.current) currIttr.current = assignActiveItterator(chosenAlgo, startEndPos, matrixState.matrix)

    allowSetIttr.current = true;
    

  },[chosenAlgo, matrix])


return (
  <div id='remote fdr'>
    <button id='reset' className='remote-btn sq-buttons' onClick={handleOnClick}>
      <SkipBack/>
    </button>


    {
      !isPlaying 
        ? <button id='play' className='remote-btn sq-buttons' onClick={handleOnClick}>
          <Play/>
        </button> 

        :<button id='pause' className='remote-btn sq-buttons' onClick={handleOnClick}>
          <Pause/>
        </button>
      }

    <button id='fast-forward' className='remote-btn sq-buttons' 
        onClick={handleOnClick}
      >

      <FastForward/>
    </button>

    <button id='skip-forward' className='remote-btn sq-buttons' onClick={handleOnClick}>
      <SkipForward/>
    </button>
  </div>
);
}

const Play:React.FC = () => (
        <svg fill='currentColor' 
            height='45px' 
            width='45px' 
            version='1.1' 
            viewBox='0 0 485 485'
            className='svg-style'
            >
        <g>
        	<path d='M413.974,71.026C368.171,25.225,307.274,0,242.5,0S116.829,25.225,71.026,71.026C25.225,116.829,0,177.726,0,242.5
        		s25.225,125.671,71.026,171.474C116.829,459.775,177.726,485,242.5,485s125.671-25.225,171.474-71.026
        		C459.775,368.171,485,307.274,485,242.5S459.775,116.829,413.974,71.026z M242.5,455C125.327,455,30,359.673,30,242.5
        		S125.327,30,242.5,30S455,125.327,455,242.5S359.673,455,242.5,455z'/>
        	<polygon points='181.062,336.575 343.938,242.5 181.062,148.425 	'/>
        </g>
        </svg>
  )


const Pause:React.FC = () =>(
    <svg 
      fill='currentColor' 
      height='45px' 
      width='45px' 
      version='1.1' 
      viewBox='0 0 485 485'
      className='svg-style'
      >
      <g>
        <path d='M413.974,71.026C368.171,25.225,307.274,0,242.5,0S116.829,25.225,71.026,71.026C25.225,116.829,0,177.726,0,242.5
          s25.225,125.671,71.026,171.474C116.829,459.775,177.726,485,242.5,485s125.671-25.225,171.474-71.026
          C459.775,368.171,485,307.274,485,242.5S459.775,116.829,413.974,71.026z M242.5,455C125.327,455,30,359.673,30,242.5
          S125.327,30,242.5,30S455,125.327,455,242.5S359.673,455,242.5,455z'/>
        <rect x='172.5' y='140' width='55' height='205'/>
        <rect x='257.5' y='140' width='55' height='205'/>
      </g>
    </svg>
  )

const FastForward:React.FC = () => (
      <svg fill='currentColor' 
          height='45px' 
          width='45px' 
          version='1.1' 
          viewBox='0 0 321.9 321.9'
          className='svg-style'
          >
          <g>
           <g>
             <path d='M315.6,149.301l-147.1-98.2c-2-1.1-4.6-2.2-7.2-2.2v0c-7.9,0-14.2,6.3-14.2,14.2v71.9l-125.5-84c-2.1-1.1-4.7-2.1-7.4-2.1
               c-7.9,0-14.2,6.3-14.2,14.2v195.9c0,11,12.1,17.9,21.5,11.6l125.5-83.5v71.9c0,11,12.1,17.9,21.5,11.6l147.1-97.7
               C324,167.101,324,155.001,315.6,149.301z M27.8,89.201l107.7,71.5l-107.7,71.9V89.201z M174.9,89.201l107.7,71.5l-107.7,71.9
               V89.201z'/>
           </g>
          </g>
      </svg>)

const Rewind:React.FC = ( ) => (
    <svg 
        fill='currentColor' 
        height='45px' 
        width='45px' 
        version='1.1' 
        viewBox='0 0 321.9 321.9' 
        className='rotate-svg svg-style'
        >
      <g>
        <g>
          <path d='M315.6,149.301l-147.1-98.2c-2-1.1-4.6-2.2-7.2-2.2v0c-7.9,0-14.2,6.3-14.2,14.2v71.9l-125.5-84c-2.1-1.1-4.7-2.1-7.4-2.1
            c-7.9,0-14.2,6.3-14.2,14.2v195.9c0,11,12.1,17.9,21.5,11.6l125.5-83.5v71.9c0,11,12.1,17.9,21.5,11.6l147.1-97.7
            C324,167.101,324,155.001,315.6,149.301z M27.8,89.201l107.7,71.5l-107.7,71.9V89.201z M174.9,89.201l107.7,71.5l-107.7,71.9
            V89.201z'/>
        </g>
      </g>
    </svg>
    )


const SkipForward:React.FC = () => (
    <svg 
      fill='currentColor' 
      height='45px' 
      width='45px' 
      version='1.1'  
      viewBox='0 0 60 60'  
      className='rotate-svg svg-style'>
    <g>
      <path d='M45.467,14.116c-0.326-0.174-0.723-0.15-1.031,0.058l-22,15C22.164,29.36,22,29.669,22,30s0.164,0.64,0.437,0.826l22,15
        C44.606,45.941,44.803,46,45,46c0.16,0,0.321-0.038,0.467-0.116C45.795,45.711,46,45.371,46,45V15
        C46,14.629,45.795,14.289,45.467,14.116z M44,43.107L24.775,30L44,16.893V43.107z'/>
      <path d='M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
        S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z'/>
      <path d='M13,46h7V14h-7V46z M15,16h3v28h-3V16z'/>
    </g>
    </svg>

)

const SkipBack:React.FC = () => (
  <svg 
    fill='currentColor' 
    height='45px' 
    width='45px' 
    version='1.1'  
    viewBox='0 0 60 60' 
    className='svg-style'
    >
  <g>
    <path d='M45.467,14.116c-0.326-0.174-0.723-0.15-1.031,0.058l-22,15C22.164,29.36,22,29.669,22,30s0.164,0.64,0.437,0.826l22,15
      C44.606,45.941,44.803,46,45,46c0.16,0,0.321-0.038,0.467-0.116C45.795,45.711,46,45.371,46,45V15
      C46,14.629,45.795,14.289,45.467,14.116z M44,43.107L24.775,30L44,16.893V43.107z'/>
    <path d='M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
      S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z'/>
    <path d='M13,46h7V14h-7V46z M15,16h3v28h-3V16z'/>
  </g>
  </svg>

)

export default Remote
