import React from 'react';
import './UIConsole.css';
import HowTo from './HowTo';
import RenderedContent from './RenderedContent';
import { consoleContent } from '../types/objects';
import { errorsState } from '../types/state';
type Props = {
  consoleContent: consoleContent;
  isPlaying: boolean;
  errors: errorsState;
}

const UIConsole: React.FC<Props> = ({ consoleContent, isPlaying }) => {
  
    return (

    <div id="console">
      { consoleContent.length > 0 
          ? <RenderedContent consoleContent={consoleContent}/>
          :  <HowTo/> 
      }
      </div>
   
  )
  
 
  ;
};

export default UIConsole;