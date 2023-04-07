import React, { useEffect } from 'react';
import { createNewMatrix } from '../utils/graphUtils';
import { useState } from 'react';
import ChooseAlgoModal from './ChooseAlgoModal';
import { pos, startStop } from '../../types/positions';
import Remote from '../../generalComponents/Remote';
import '../../Graphs/graphs.css'
import { consoleContentState, errorsState, isPlayingState, matrixNodeState, matrixState, startEndPosState } from '../../types/state';
import matrixDescriptions from '../utils/descriptions';
import { resetStyleSync, styleElement, styleElementSync } from '../utils/matrixStyling';

interface Props{
  matrixNodeState: matrixNodeState;
  matrixState: matrixState;
  matrixDimState:{
    matrixDim: pos,
    setMatrixDim: React.Dispatch<React.SetStateAction<pos>>,
  }
  startEndPosState: startEndPosState
  consoleContentState: consoleContentState;
  isPlayingState: isPlayingState,
  errorsState: errorsState,

  
}

//temporary fix
const MATRIX_HARD_LIMIT_Y: number = 40;
const MATRIX_HARD_LIMIT_X: number = 80; 

const MatrixBanner:React.FC<Props> = ({matrixNodeState,  matrixState, matrixDimState,  startEndPosState,  consoleContentState,  isPlayingState,  errorsState}) => {

  const [chooseAlgoModal, setChooseAlgoModal] = useState<boolean>(false)
  const [chosenAlgo, setChosenAlgo] = useState<string>('Choose your algorithim')
  const {matrixNodes, setMatrixNodes} = matrixNodeState;
  const {matrix, setMatrix} = matrixState;
  const { matrixDim,setMatrixDim} = matrixDimState;
  const  {startEndPos, setStartEndPos} = startEndPosState;
  const  {isPlaying, setIsPlaying} = isPlayingState;
  const {errors, setErrors} = errorsState;


  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>, origin: string) =>{
    e.preventDefault();
    e.stopPropagation();

    const newMatrixDim = {...matrixDim}
    if (origin === 'height') newMatrixDim['y'] = Number(e.target.value);
    else newMatrixDim['x'] = Number(e.target.value);

    setMatrixDim(prev => newMatrixDim)
  }

  const resetMatrix = ():void =>{
    for(let i: number = 0; i  < matrix.length; i ++)
      for(let j: number = 0; j  < matrix.length; j ++){
        resetStyleSync([i, j], 'tile udc')
      }
    setMatrix(createNewMatrix(Math.min(matrixDim.y, MATRIX_HARD_LIMIT_Y), Math.min(matrixDim.x, MATRIX_HARD_LIMIT_X)))
    
  }

  useEffect(()=>{

    
    setMatrix(prev => createNewMatrix(Math.min(matrixDim.y, MATRIX_HARD_LIMIT_Y), Math.min(matrixDim.x, MATRIX_HARD_LIMIT_X)))

  }, [matrixDim])

  useEffect(()=>{
    if(chosenAlgo !== 'Choose your algorithim')
       consoleContentState.setConsoleContent(prev => ({'desc':matrixDescriptions[chosenAlgo]}))

  }, [chosenAlgo])



  return (
    <div id='banner' className='udc-left fdr'>
        <div className='udc fdr univ-padding'>
          <button   
              className='sq-buttons banner-button udc'
              onClick={()=> setMatrixNodes(!matrixNodes)}
              >
            {`Change to ${matrixNodes ? 'nodes' : 'matrix'}`}
          </button>

          <button  
              className='sq-buttons banner-button udc'
              onClick={resetMatrix }>
              Reset Matrix
          </button>

          {matrixNodes && 
          <div className='fdr udc-left'>

            <form onSubmit={e => e.preventDefault()}>
              <input placeholder='Set height' onChange={e => handleOnChange(e,'height')}/>

            </form>
            <form onSubmit={e => e.preventDefault()}>
              <input placeholder='Set width' onChange={e => handleOnChange(e,'width')}/>

            </form>
            
          </div>}

          <button className='sq-buttons banner-button udc' onClick={()=>setChooseAlgoModal(!chooseAlgoModal)}>
            {chosenAlgo}
          </button>
          
          
          {chooseAlgoModal && <ChooseAlgoModal chooseModalState ={{chooseAlgoModal, setChooseAlgoModal}} chooseAlgoState={{chosenAlgo, setChosenAlgo}}/> }
        </div>
        <div>

          <Remote chosenAlgo={chosenAlgo} 
                  matrixState={{matrix, setMatrix}} 
                  startEndPos={startEndPos} 
                  consoleContentState={consoleContentState}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  
                  />

        </div>
    </div>
  )
}

export default MatrixBanner
