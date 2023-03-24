import React from 'react'

interface Props{
  
  chooseModalState:{
    chooseAlgoModal:boolean;
    setChooseAlgoModal:React.Dispatch<React.SetStateAction<boolean>>
  }

  chooseAlgoState:{
    chosenAlgo:string;
    setChosenAlgo:React.Dispatch<React.SetStateAction<string>>
  }
}

const ChooseAlgoModal: React.FC<Props> = ({chooseModalState, chooseAlgoState}) => {
  const {chosenAlgo, setChosenAlgo} = chooseAlgoState;
  

  
  if (chosenAlgo) document.body.classList.add('active-modal')
  else document.body.classList.remove('active-modal')


  return (
    <div className="modal">
      <div className='modal-overlay'>
          <div className="modal-content">
          </div>
      </div>
    </div>
  )
}

export default ChooseAlgoModal
