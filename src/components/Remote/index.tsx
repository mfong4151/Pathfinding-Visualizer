import React, {FC, useRef, useEffect} from 'react'
import './remote.css'
import { consoleContentState } from '../../types/state';
import { startStop } from '../../types/positions';
import { itterator } from '../../types/itterator';
import { consoleContent, matrixItemObject } from '../../types/objects';
import assignActiveItterator from './utils/assignActiveItter';
import SkipBack from '../SVGS/SkipBack';
import Play from '../SVGS/Play';
import FastForward from '../SVGS/Fastforward';
import SkipForward from '../SVGS/SkipForward';
import { styleElement, styleElementSync, styleShortestPath, styleShortestPathSync } from '../Matricies/utils/matrixStyling';
import { inShortestPathExclusions } from './utils/graphUtils';
import { forwardConsoleMsgs } from './utils/remoteUtils';
import { StateSetter } from '../../types/setState';

interface Props{
    chosenAlgo: string;
    matrixState: {
        matrix: matrixItemObject[][];
        setMatrix: StateSetter<matrixItemObject[][]>
    };
    startEndPos: startStop;
    consoleContentState: consoleContentState
    isPlaying: boolean,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
    matrixDiv: any
}

const Remote:FC<Props> = ({chosenAlgo, matrixState, startEndPos,  consoleContentState, isPlaying, setIsPlaying, matrixDiv}) => {
  const {setConsoleContent} = consoleContentState;
  const currIttr = useRef<itterator>(null);
  const allowSetIttr = useRef<boolean>(true);
  const animationRef = useRef<boolean>(false);
  const {matrix} = matrixState;  
  const {start, end} = startEndPos;
  let coords :number[] = [-1, -1];
  let hasAnimated = animationRef.current
  
  //used with the reset button 
  const reset = ():void => {
    const exclusions = new Set(['s', 'w', 'e']);
    
    for(let i:number = 0; i < matrix.length; i++)
      for(let j:number = 0; j < matrix[0].length; j++){
        if (exclusions.has(matrix[i][j].val)) continue
      
        document.getElementById(`cell-${j}-${i}`)!.className = 'tile udc';

      }

      currIttr.current = assignActiveItterator(chosenAlgo, startEndPos, matrixState.matrix);
      hasAnimated = false
  }

  
  const forward = (activeIttr: any, newConsoleContent: string[]):void =>{

    if (activeIttr.isContainerEmpty()){
      newConsoleContent.push('In this case, the end point could not be found')

    } else if(!activeIttr.isValidNext()) {
       const invalidPos:number[] = activeIttr.discardInvalidNode()!

       if(invalidPos[0] < 0 || invalidPos[0] >= matrix[0].length || invalidPos[1] < 0 || invalidPos[1] > matrix.length)
        newConsoleContent.push(`At this point, the position ${invalidPos[0]},${invalidPos[1]} is off the board. So we don't visit it` )

       else
         newConsoleContent.push(`At this point, the node ${invalidPos[0]},${invalidPos[1]} was already visited, so we don't revisit it ` )
  
    }  else  {
      coords = activeIttr.next()
    
      if (!activeIttr.isStart(coords) && !activeIttr.isEnd(coords)){

        newConsoleContent.push(`At this point we visit the point [${coords[0]}, ${coords[1]}]`)
        styleElement(coords, 'visited-1');
        const msg:string[] = forwardConsoleMsgs(activeIttr)
        newConsoleContent.push(msg[0])
      }
    }
  }

  
  const play = (activeIttr:any, newConsoleContent: string[]):void  =>{
    setIsPlaying(true)
    const res:matrixItemObject[] = activeIttr.preformFullAlgo()
  
    const illustrate = async():Promise<void> =>{
      for(let i:number = 0; i < res.length; i ++){
        const node:matrixItemObject = res[i];

        if(!activeIttr.isStart(node.pos) && !activeIttr.isEnd(node.pos)){
          styleElementSync(node.pos, 'visited-1')
          await new Promise(resolve => setTimeout(resolve, Math.min(i / 12, 13)));
        }
      }
    };

    illustrate().then(()=>{

      const excluded = inShortestPathExclusions(activeIttr)

      if (!excluded){
        if (activeIttr.endFound) styleShortestPath(activeIttr.generateShortestPath())
        else newConsoleContent.push('In this scenario, the endpoint could not be reached.')
      }
      else if(!activeIttr.endFound){
        newConsoleContent.push('In this scenario, the endpoint could not be reached.')
      }
      
      setIsPlaying(false)

    })


  }

   
  const skipForward = (activeIttr: any, newConsoleContent: string[]):void =>{
    const res:matrixItemObject[] = activeIttr.preformFullAlgo()
    
    for(let i:number = 0; i < res.length; i ++){
        const node:matrixItemObject = res[i];
        if(!activeIttr.isStart(node.pos) && !activeIttr.isEnd(node.pos)) styleElementSync(node.pos, 'visited-1-sync') 
    }

    if (activeIttr.endFound && !inShortestPathExclusions(activeIttr)) styleShortestPathSync(activeIttr.generateShortestPath())
    else newConsoleContent.push('In this scenario, the endpoint could not be reached.')

  
  }

  

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    const buttonId = e.currentTarget.id;
    const newConsoleContent: consoleContent = [];
    const activeIttr = currIttr.current;
 

    if (!activeIttr || start.x === -1 || end.x === -1) {
      
      if (!activeIttr) newConsoleContent.push('You need to select an algo!');
      else if (start.x === -1) newConsoleContent.push('You need to place the starter somewhere! a start!');
      else newConsoleContent.push('You need to select an end!');

      setConsoleContent(newConsoleContent)
      return 
    }


    switch (buttonId) {
      case 'reset':
        newConsoleContent.push(`Resetting the board so you can play everything again :3`)
        reset();
        break;

      case 'play':

        newConsoleContent.push(`Currently showing the playthrough for ${chosenAlgo}`)
        play(activeIttr, newConsoleContent)
        break;
        
      case 'fast-forward':
        if(!activeIttr.endFound) forward(activeIttr, newConsoleContent);
        else(styleShortestPathSync(activeIttr.generateShortestPath()))
        break;

      case 'skip-forward':
        skipForward(activeIttr, newConsoleContent)
        break;

      default:
        break
    }

    if(newConsoleContent) setConsoleContent(newConsoleContent)
    hasAnimated = true //prevent reanimations
    allowSetIttr.current = false;

    return
};


//covers edge case of if someone hits reset, and then changes the algo they want to see
  useEffect(()=>{
    allowSetIttr.current = true;
  },[chosenAlgo])

  useEffect(()=>{
    currIttr.current = assignActiveItterator(chosenAlgo, startEndPos, matrixState.matrix)
  },[startEndPos, matrix])

  useEffect(()=>{
    if(allowSetIttr.current) currIttr.current = assignActiveItterator(chosenAlgo, startEndPos, matrixState.matrix)
    allowSetIttr.current = true;  

  },[chosenAlgo])

  return (
    <div id='remote' className='fdr se'>
      <button id='reset' className='remote-btn sq-buttons udc' onClick={handleOnClick}>
        <SkipBack/>
      </button>

      <button id='play' className='remote-btn sq-buttons udc' onClick={handleOnClick}>
        <Play/>
      </button> 

      <button  id='fast-forward'  className='remote-btn sq-buttons udc'  onClick={handleOnClick}>
        <FastForward/>
      </button>

      <button id='skip-forward' className='remote-btn sq-buttons' onClick={handleOnClick}>
        <SkipForward/>
      </button>
    </div>
  )

}







export default Remote

