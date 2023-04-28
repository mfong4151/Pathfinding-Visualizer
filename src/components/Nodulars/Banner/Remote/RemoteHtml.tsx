import {FC}from 'react'
import SkipBack from './svgs/SkipBack';
import Play from './svgs/Play';
import Pause from './svgs/Pause';
import FastForward from './svgs/Fastforward';
import SkipForward from './svgs/SkipForward';
import './Remote.css'

interface Props{
  handleOnClick:(e: React.MouseEvent<HTMLButtonElement>) => void;
  isPlaying: boolean;
}

const RemoteHtml:FC<Props> = ({handleOnClick, isPlaying}) => {
    return (
      <div id='remote' className='fdr se'>
        <button id='reset' className='remote-btn sq-buttons udc' onClick={handleOnClick}>
          <SkipBack/>
        </button>
    
        <button id='play' className='remote-btn sq-buttons udc' onClick={handleOnClick}>
              <Play/>
          </button> 
        {/* {
          !isPlaying 
            ? <button id='play' className='remote-btn sq-buttons udc' onClick={handleOnClick}>
              <Play/>
            </button> 
    
            :<button id='pause' className='remote-btn sq-buttons udc' onClick={handleOnClick}>
              <Pause/>
            </button>
          } */}
    
        <button 
            id='fast-forward' 
            className='remote-btn sq-buttons udc' 
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

export default RemoteHtml
