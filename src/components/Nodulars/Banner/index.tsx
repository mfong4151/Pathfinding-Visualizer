import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import ChooseAlgoModal from './ChooseAlgoModal';

interface Props{

}
const Banner:React.FC<Props> = ({ }) => {

  const [chooseAlgoModal, setChooseAlgoModal] = useState<boolean>(false)
  const [chosenAlgo, setChosenAlgo] = useState<string>('Choose your algorithim')
  const chooseAlgoRef = useRef<any>()



 const resetCanvas = ():void=>{

 }

  return (
    <div id='banner' className='udc-left fdr'>
        <div className='udc fdr univ-padding'>
      

          <button  
              className='sq-buttons hover-over banner-button udc'
              onClick={resetCanvas}
              >
              Reset Canvas
          </button>

        
          <div className='fdr udc-left'>

            {/* this was a section for forms, might or might not be needed in the future */}
            
          </div>

          <button className='sq-buttons hover-over banner-button udc' onClick={()=>setChooseAlgoModal(!chooseAlgoModal)} ref={chooseAlgoRef}>
            {chosenAlgo}
          </button>
          
          
          {chooseAlgoModal && 
            <ChooseAlgoModal 
              chooseModalState ={{chooseAlgoModal, setChooseAlgoModal}} 
              chooseAlgoState={{chosenAlgo, setChosenAlgo}}
              chooseAlgoButton = {chooseAlgoRef.current}
              /> }
        </div>
        <div>

            {/* remote here */}
        </div>
    </div>
  )
}

export default Banner;
