import React from 'react';
import './UIConsole.css';
import HowTo from './HowTo';
import RenderedContent from './RenderedContent';

type Props = {
  consoleContent: any[];
  isPlaying: boolean;

}

const UIConsole: React.FC<Props> = ({ consoleContent, isPlaying }) => {
  return (
    <div id="console">
      {!isPlaying && <HowTo/>}
      {isPlaying && <RenderedContent consoleContent={consoleContent}/>}
      
    </div>
  );
};

export default UIConsole;