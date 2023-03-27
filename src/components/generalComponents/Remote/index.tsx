import React, {useRef, useEffect} from 'react'
import './remote.css'
import {matrixState} from '../../types/state'
import { startStop } from '../../types/positions';
import { BFSItteratorMatrix } from '../../Graphs/utils/algorithims/matrixBFS';
import { DFSIteratorMatrix } from '../../Graphs/utils/algorithims/matrixDFS';
import { itterator } from '../../types/itterator';

interface Props{
    chosenAlgo: string;
    matrixState: matrixState;
    startEndPos: startStop;
    setConsoleContent: React.Dispatch<React.SetStateAction<any>>;
    isPlaying: boolean,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
}


const Remote:React.FC<Props> = ({chosenAlgo, matrixState, startEndPos, isPlaying, setIsPlaying}) => {

  const currItterator = useRef<itterator>(null);
  const allowSetMatrix = useRef<boolean>(true);
  const {matrix, setMatrix} = matrixState;

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonId = e.currentTarget.id;
    const newMatrix: string[][] = [...matrix];
    
    setMatrix(prev => newMatrix)
    switch (buttonId) {
      case 'skip-back':
        // handle skip back button click
        break;
      case 'rewind':
        // handle rewind button click
        break;
      case 'play':
        // handle play button click
        break;
      case 'pause':
        // handle pause button click
        break;
      case 'fast-forward':
        // handle fast-forward button click
        break;
      case 'skip-forward':
        // handle skip forward button click
        break;
      default:
        break
    }

    allowSetMatrix.current = false;
    return
};

  useEffect(()=>{
    
    if(allowSetMatrix.current) switch(chosenAlgo)
    
    {
      case 'BFS':
        currItterator.current = new BFSItteratorMatrix([startEndPos.start.y, startEndPos.start.x], [startEndPos.end.y, startEndPos.end.x], matrixState.matrix);
        break
      

      default:
        break
    }
    allowSetMatrix.current = true;

  },[chosenAlgo, matrix])


return (
  <div id='remote'>
    <button id='skip-back' className='remote-btn sq-buttons' onClick={handleOnClick}>
      <SkipBack/>
    </button>
    <button  id='rewind' className='remote-btn sq-buttons' onClick={handleOnClick}>
      <Rewind/>
    </button>

    <button id='play' className='remote-btn sq-buttons' onClick={handleOnClick}>
      <Play/>
    </button>
    <button id='pause' className='remote-btn sq-buttons' onClick={handleOnClick}>
      <Pause/>
    </button>
    <button id='fast-forward' className='remote-btn sq-buttons' onClick={handleOnClick}>
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
            height='auto' 
            width='60px' 
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
      height='auto' 
      width='60px' 
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
          height='auto' 
          width='60px' 
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
        height='auto' 
        width='60px' 
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
      height='auto' 
      width='60px' 
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
    height='auto' 
    width='60px' 
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

