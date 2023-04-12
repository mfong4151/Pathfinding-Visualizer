import React, {FC, useRef, useEffect} from 'react'
import './remote.css'
import { consoleContentState, matrixState } from '../../../types/state';
import { startStop } from '../../../types/positions';
import { itterator, } from '../../../types/itterator';
import { consoleContent, matrixItemObject } from '../../../types/objects';
import assignActiveItterator from './utils/assignActiveItter';
import { styleElement, styleShortestPath } from '../../utils/matrixStyling';
import { BFSItteratorMatrix } from '../../utils/algorithims/matrixBFS';
import { DFSItteratorMatrix } from '../../utils/algorithims/matrixDFS';
import convertContainer from './utils/convertContainer';
import Play from '../../../Nodulars/Banner/Remote/svgs/Play';
import FastForward from '../../../Nodulars/Banner/Remote/svgs/Fastforward';
import SkipBack from '../../../Nodulars/Banner/Remote/svgs/SkipBack';
import SkipForward from '../../../Nodulars/Banner/Remote/svgs/SkipForward';
import Pause from '../../../Nodulars/Banner/Remote/svgs/Pause';

interface Props{
    chosenAlgo: string;
    matrixState: matrixState;
    startEndPos: startStop;
    consoleContentState: consoleContentState
    isPlaying: boolean,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
}


const Remote:FC<Props> = ({chosenAlgo, matrixState, startEndPos,  consoleContentState, isPlaying, setIsPlaying}) => {
  const {setConsoleContent} = consoleContentState;

  const currIttr = useRef<itterator>(null);
  const allowSetIttr = useRef<boolean>(true);
  const {matrix} = matrixState;


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
      //Handle case of invalid nodes, in other words nodes that we cant visit because they're off the board or 
      if(!activeIttr.isValidNext()) {
         const invalidPos:number[] = activeIttr.discardInvalidNode()!
         if(invalidPos[0] < 0 || invalidPos[0] >= matrix[0].length || invalidPos[1] < 0 || invalidPos[1] > matrix.length)
          newConsoleContent['msg'] = `At this point, the position ${invalidPos[0]},${invalidPos[1]} is off the board. So we don't visit it` 

         else
           newConsoleContent['msg'] = `At this point, the node ${invalidPos[0]},${invalidPos[1]} was already visited, so we don't revisit it ` 

         
      } else  {
        coords = activeIttr.next()
      
        if (!activeIttr.isStart(coords) && !activeIttr.isEnd(coords)){

          newConsoleContent['Visited'] = `At this point we visit the point [${coords[0]}, ${coords[1]}]`
          styleElement(coords, 'visited-1');
          

          //Handle various cases, for some reason switch case doesnt work here
          if (activeIttr instanceof BFSItteratorMatrix) newConsoleContent['queue'] = `Queue: ${convertContainer(activeIttr.q)}`

          else if (activeIttr instanceof DFSItteratorMatrix) newConsoleContent['stack'] = `Stack: ${convertContainer(activeIttr.stack)}`

      
          else return 
          


        }
      }
    }


    const play = ():void  =>{
      const res:matrixItemObject[] = activeIttr.preformFullAlgo()
      const illustrate = async():Promise<void> =>{
        for(let i:number = 0; i < res.length; i ++){
          const node:matrixItemObject = res[i];

          if(!activeIttr.isStart(node.pos) && !activeIttr.isEnd(node.pos)){
            styleElement(node.pos, 'visited-1', i)
            await new Promise(resolve => setTimeout(resolve, 10));
          }
        }
      };

      illustrate().then(()=>{

      if (activeIttr.endFound){
        styleShortestPath(activeIttr.generateShortestPath())
      } else{

        newConsoleContent['No end'] = 'In this scenario, the endpoint could not be reached.'

      }
      })
    }

    const skipForward = ():void =>{
      // console.log(activeIttr.test)
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







export default Remote

