import React, { useState} from 'react';
import './UIConsole.css';
import HowTo from './HowTo';
import RenderedContent from './RenderedContent';
import { consoleContent } from '../../types/objects';

type Props = {
  consoleContent: consoleContent;
  isPlaying: boolean;

}

const UIConsole: React.FC<Props> = ({ consoleContent, isPlaying }) => {
  const [errors, setErrors] = useState<string[]>([]);


  return (

    <div id="console">
      {!isPlaying && <HowTo/>}
      {isPlaying && <RenderedContent consoleContent={consoleContent}/>}
      
    </div>
  );
};

export default UIConsole;