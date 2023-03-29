import React, { useEffect } from 'react';
import { createNewMatrix } from '../utils/graphUtils';
import { useState } from 'react';
import ChooseAlgoModal from './ChooseAlgoModal';
import { pos, startStop } from '../../types/positions';
import Remote from '../../generalComponents/Remote';
import '../../Graphs/graphs.css'
import { consoleContentState, errorsState, isPlayingState, matrixNodeState, matrixState, startEndPosState } from '../../types/state';
import { consoleContent } from '../../types/objects';
import matrixDescriptions from '../utils/descriptions';

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
    e.stopPropagation()

    const newMatrixDim = {...matrixDim}
    if (origin === 'height') newMatrixDim['y'] = Number(e.target.value);
    else newMatrixDim['x'] = Number(e.target.value);

    setMatrixDim(prev => newMatrixDim)
    return
  }

  const resetMatrix = ():void =>{
    setMatrix(createNewMatrix(matrixDim.y, matrixDim.x))
 
    
    
  }

  useEffect(()=>{
    setMatrix(prev => createNewMatrix(matrixDim.y, matrixDim.x))

  }, [matrixDim])

  useEffect(()=>{
    if(chosenAlgo !== 'Choose your algorithim')
       consoleContentState.setConsoleContent(prev => ({'desc':matrixDescriptions[chosenAlgo]}))

  }, [chosenAlgo])



  return (
    <div id='banner' className='udc-left fdr'>
        <div className='udc fdr'>
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

            <form>
              <input placeholder='Set height' onChange={e => handleOnChange(e,'height')}/>

            </form>
            <form>
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
