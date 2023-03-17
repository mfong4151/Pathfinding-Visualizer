import React, { useEffect } from 'react'
import { createNewMatrix } from '../utils/graphUtils'

interface Props{
  matrixBannerStates:{
    matrixNodes: boolean,
    setMatrixNodes: React.Dispatch<React.SetStateAction<boolean>>,
    matrix: Array<Array<string>>,
    setMatrix: React.Dispatch<React.SetStateAction<Array<Array<string>>>>,
    matrixDim: {y: number, x:number},
    setMatrixDim: React.Dispatch<React.SetStateAction<{y: number, x:number}>>
  }
}

const MatrixBanner:React.FC<Props> = ({matrixBannerStates}) => {
  const {matrixNodes, setMatrixNodes, matrix, setMatrix, matrixDim, setMatrixDim} = matrixBannerStates;


  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>, origin: string) =>{
    e.preventDefault();
    e.stopPropagation()

    const newMatrixDim = {...matrixDim}
    if (origin === 'height') newMatrixDim['y'] = Number(e.target.value);
    else newMatrixDim['x'] = Number(e.target.value);

    setMatrixDim(prev => newMatrixDim)
    return
  }

  useEffect(()=>{
    setMatrix(prev => createNewMatrix(matrixDim.y, matrixDim.x))

  }, [matrixDim])

  return (
    <div className='banner'>

          <button   
              className='sq-buttons banner-button udc'
              onClick={()=> setMatrixNodes(!matrixNodes)}
              >
            {`Change to ${matrixNodes ? 'nodes' : 'matrix'}`}
          </button>

          <button 
              className='sq-buttons banner-button udc'
              onClick={() => setMatrix(createNewMatrix(matrixDim.y, matrixDim.x))}
              >
              Reset Matrix
          </button>
          {matrixNodes && <div>


            <form>
              <input placeholder='Set height' onChange={e => handleOnChange(e,'height')}/>

            </form>
            <form>
              <input placeholder='Set width' onChange={e => handleOnChange(e,'width')}>

              </input>
            </form>
          </div>}
        </div>
  )
}

export default MatrixBanner
