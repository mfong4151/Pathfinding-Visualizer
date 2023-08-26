import React, {FC, useEffect, useRef } from 'react';
import { createNewMatrix } from '../Remote/utils/graphUtils';
import { useState } from 'react';
import ChooseAlgoModal from './ChooseAlgoModal';
import { pos } from '../../types/positions';
import Remote from '../Remote';
import './../Matricies/graphs.css'
import { consoleContentState, errorsState, isPlayingState, matrixStates, startEndPosState } from '../../types/state';
import matrixDescriptions from '../Matricies/utils/descriptions';
import { resetStyleSync } from '../Matricies/utils/matrixStyling';
import { calculateResize } from '../../utils/resizeCanvas';
import useCanvasResize from '../../hooks/useCanvasResize';

interface Props{
  matrixState: matrixStates;
  matrixDimState:{
    matrixDim: pos,
    setMatrixDim: React.Dispatch<React.SetStateAction<pos>>,
  }
  startEndPosState: startEndPosState
  consoleContentState: consoleContentState;
  isPlayingState: isPlayingState,
  errorsState: errorsState,
  matHolderDiv: HTMLDivElement | null,
  matrixDiv: HTMLDivElement | null, 
}

//temporary fix


const MatrixBanner:React.FC<Props> = ({ matrixState, matrixDimState,  startEndPosState,  consoleContentState,  isPlayingState, matHolderDiv, matrixDiv}) => {

  const [chooseAlgoModal, setChooseAlgoModal] = useState<boolean>(false)
  const [chosenAlgo, setChosenAlgo] = useState<string>('Choose your algorithm')
  const {matrix, setMatrix} = matrixState;
  const { matrixDim,setMatrixDim} = matrixDimState;
  const  {startEndPos, setStartEndPos} = startEndPosState;
  const  {isPlaying, setIsPlaying} = isPlayingState;
  const chooseAlgoRef = useRef<any>()


  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
    e.stopPropagation();
    
    const newMatrixDim:pos = {...matrixDim}
    if (e.target.id === 'height') newMatrixDim.y = Number(e.target.value);
    else newMatrixDim.x = Number(e.target.value);
    setMatrixDim( newMatrixDim)
  }

  const handleOnClick= ():void =>{
    if(!matHolderDiv || !matrixDiv) return 

    for(let i: number = 0; i  < matrix.length; i ++)
      for(let j: number = 0; j  < matrix[0].length; j ++){
        resetStyleSync([j, i], 'tile udc')  
    }
    const [rows, cols]:[number, number] = calculateResize(matrixDim, matrixDiv, matHolderDiv)
    setMatrix( createNewMatrix(rows, cols))
    setStartEndPos( {start:{y: -1, x: -1}, end: {y: -1, x: -1}})
    return
  }

  useCanvasResize(matHolderDiv!, matrixDiv!, matrixDim, startEndPos, setMatrix, setStartEndPos, [matrixDim])



  useEffect(()=>{
    if(chosenAlgo !== 'Choose your algorithm')
       consoleContentState.setConsoleContent( (matrixDescriptions[chosenAlgo]))

  }, [chosenAlgo])



  return (
    <div id='banner' className='sb fdr'>
        <div id='banner-options' className='udc fdr univ-padding banner-holder'>
          
          <button className='sq-buttons hover-over banner-button udc' onClick={handleOnClick}>
              Reset Matrix
          </button>

          <div className='fdr udc-left'>

            <form id='change-dims-form' className='udc-left' onSubmit={e => e.preventDefault()}>
              <input id='height' placeholder='Set height' className='set-dim-form udc' onChange={e => handleOnChange(e)}/>
              <input id='width' placeholder='Set width' className='set-dim-form udc' onChange={e => handleOnChange(e)}/>
            </form>
            
          </div>

          <button className='sq-buttons hover-over banner-button udc' onClick={()=>setChooseAlgoModal(!chooseAlgoModal)} ref={chooseAlgoRef}>
            {chosenAlgo} <DownArrow/>
          </button>
          
          
        
        </div>
        <div className='udc fdr banner-holder'>

          <Remote 
                  chosenAlgo={chosenAlgo} 
                  matrixState={{matrix, setMatrix}} 
                  startEndPos={startEndPos} 
                  consoleContentState={consoleContentState}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  matrixDiv ={matrixDiv}
            />

        </div>
        {chooseAlgoModal && 
            <ChooseAlgoModal 
              chooseModalState ={{chooseAlgoModal, setChooseAlgoModal}} 
              chooseAlgoState={{chosenAlgo, setChosenAlgo}}
              chooseAlgoButton = {chooseAlgoRef.current}
              /> }
    </div>
  )
}

export default MatrixBanner


const DownArrow: FC =() => (
  <svg width="24px" height="24px" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" 
      aria-hidden="true" focusable="false">
        <path d="M17 11.7494V14.916L12 11.0827L7 14.916V11.7494L12 7.91602L17 11.7494Z" fill="white" transform="rotate(180, 12, 12)">
        </path>
    </svg>
)