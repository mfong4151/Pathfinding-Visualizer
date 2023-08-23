import React from 'react'
import './Banner.css'
import { StateSetter } from '../../types/setState';
import algoChoices from '../../algorithims/algoChoices';

interface Props{
  chooseModalState:{
    chooseAlgoModal:boolean;
    setChooseAlgoModal:StateSetter<boolean>
  }
  chooseAlgoState:{
    chosenAlgo:string;
    setChosenAlgo:StateSetter<string>
  }
  chooseAlgoButton:HTMLButtonElement  
}



const ChooseAlgoModal: React.FC<Props> = ({chooseModalState, chooseAlgoState, chooseAlgoButton}) => {
  const MANUAL_OFFSET_X: number = 8;
  const {chosenAlgo, setChosenAlgo} = chooseAlgoState; 
  const {chooseAlgoModal, setChooseAlgoModal} = chooseModalState;
  const posLeft: string = `${chooseAlgoButton.offsetLeft - MANUAL_OFFSET_X}px`
  const posTop: string = `${chooseAlgoButton.offsetTop +chooseAlgoButton.offsetHeight}px`
  const divWidth: string=  `${chooseAlgoButton.offsetWidth}px`

  if (chosenAlgo) document.body.classList.add('active-modal')
  else document.body.classList.remove('active-modal')


  return (
    <div className="modal">
      <div className='modal-overlay' onClick={()=>setChooseAlgoModal(!chooseAlgoModal)}>
          <div 
              id="choose-algo-modal"
              className="modal-content fdc" 
              style={{left: posLeft, top: posTop, minWidth: divWidth}}
            >

                {algoChoices.map((algo: string, idx: number)=>

              <p className='algo-choice-item udc hover-over' key={idx} onClick={()=> setChosenAlgo(algo)}>
                {algo}
              </p>
            
            )}
          </div>
      </div>
    </div>
  )
}

export default ChooseAlgoModal
