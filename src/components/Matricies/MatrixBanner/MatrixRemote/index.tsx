import React, {FC, useRef, useEffect} from 'react'
import './remote.css'
import { consoleContentState, matrixState } from '../../../../types/state';
import { startStop } from '../../../../types/positions';
import { itterator } from '../../../../types/itterator';
import { consoleContent, matrixItemObject } from '../../../../types/objects';
import assignActiveItterator from './utils/assignActiveItter';
import { styleElement, styleElementSync, styleShortestPath, styleShortestPathSync } from '../../utils/matrixStyling';
import Play from '../../../Nodulars/Banner/Remote/svgs/Play';
import FastForward from '../../../Nodulars/Banner/Remote/svgs/Fastforward';
import SkipBack from '../../../Nodulars/Banner/Remote/svgs/SkipBack';
import SkipForward from '../../../Nodulars/Banner/Remote/svgs/SkipForward';
import Pause from '../../../Nodulars/Banner/Remote/svgs/Pause';
import { inShortestPathExclusions } from './utils/graphUtils';
import { forwardConsoleMsgs } from './utils/remoteUtils';
import RemoteHtml from '../../../Nodulars/Banner/Remote/RemoteHtml';

interface Props{
    chosenAlgo: string;
    matrixState: matrixState;
    startEndPos: startStop;
    consoleContentState: consoleContentState
    isPlaying: boolean,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
    matrixDiv: HTMLDivElement | null;
}


const Remote:FC<Props> = ({chosenAlgo, matrixState, startEndPos,  consoleContentState, isPlaying, setIsPlaying, matrixDiv}) => {
  const {setConsoleContent} = consoleContentState;

  const currIttr = useRef<itterator>(null);
  const allowSetIttr = useRef<boolean>(true);
  const animationRef = useRef<boolean>(false);
  const {matrix} = matrixState;  
  const {start, end} = startEndPos;
  let coords :number[] = [-1, -1];


  //Now I can't say that this is the cleanest code ever written, but hear me out: 
  // Too many of the variables and functions involved employ closure, so the easiest way to "clean it" up was to stick it in nested functions
  //At the very least in your code editor you can click the > arrow to make it all go away...


  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    const buttonId = e.currentTarget.id;
    const newConsoleContent: consoleContent = [];
    const activeIttr = currIttr.current;
    let hasAnimated = animationRef.current
 

    if (!activeIttr || start.x === -1 || end.x === -1) {
      
      if (!activeIttr) newConsoleContent.push('You need to select an algo!');
      else if (start.x === -1) newConsoleContent.push('You need to place the starter somewhere! a start!');
      else newConsoleContent.push('You need to select an end!');

      setConsoleContent(prev => newConsoleContent)
      return 
    }

  
    //used with the reset button 
    const reset = ():void => {
      const exclusions = new Set(['s', 'w', 'e']);
      
      for(let i:number = 0; i < matrix.length; i++)
        for(let j:number = 0; j < matrix[0].length; j++){
          if (exclusions.has(matrix[i][j].val)) continue;
          document.getElementById(`cell-${j}-${i}`)!.className = 'tile udc';

        }

        currIttr.current = assignActiveItterator(chosenAlgo, startEndPos, matrixState.matrix);
        hasAnimated = false
    }

    const forward = ():void =>{
      //Handle case of invalid nodes, in other words nodes that we cant visit because they're off the board or 

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


    const play = ():void  =>{
      setIsPlaying(prev => true)
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
      else{
        if (!activeIttr.endFound)newConsoleContent.push('In this scenario, the endpoint could not be reached.')
      }
      
      setIsPlaying(false)

      })


    }

    const skipForward = ():void =>{
      const res:matrixItemObject[] = activeIttr.preformFullAlgo()
      
      for(let i:number = 0; i < res.length; i ++){
          const node:matrixItemObject = res[i];
          if(!activeIttr.isStart(node.pos) && !activeIttr.isEnd(node.pos)) styleElementSync(node.pos, 'visited-1-sync') 
      }

      if (activeIttr.endFound && !inShortestPathExclusions(activeIttr)) styleShortestPathSync(activeIttr.generateShortestPath())
      else newConsoleContent.push('In this scenario, the endpoint could not be reached.')

    
    }

    const test = ():void =>{
      activeIttr.next()
    }
    
    switch (buttonId) {
      case 'reset':
        newConsoleContent.push(`Resetting the board so you can play everything again :3`)
        reset();
        break;

      case 'play':

        newConsoleContent.push(`Currently showing the playthrough for ${chosenAlgo}`)
        // if (hasAnimated) reset()
        play()
        break;

      case 'pause':
        setIsPlaying(prev => !isPlaying)

        break;

      case 'fast-forward':
        // if (hasAnimated) reset()
        if(!activeIttr.endFound) forward();
        else(styleShortestPathSync(activeIttr.generateShortestPath()))
        break;
      case 'skip-forward':
        // if (hasAnimated) reset()
        skipForward()
        break;
      default:
        break
    }

    if(newConsoleContent) setConsoleContent(prev => newConsoleContent)
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

  return (<RemoteHtml handleOnClick={handleOnClick} isPlaying={isPlaying}/>)

}







export default Remote

