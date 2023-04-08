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
  chooseAlgoButton:HTMLButtonElement  
}

const ChooseAlgoModal: React.FC<Props> = ({chooseModalState, chooseAlgoState, chooseAlgoButton}) => {
  const {chosenAlgo, setChosenAlgo} = chooseAlgoState; 
  const {chooseAlgoModal, setChooseAlgoModal} = chooseModalState;
  const posLeft: string = `${chooseAlgoButton.offsetLeft}px`
  const posTop: string = `${chooseAlgoButton.offsetTop +chooseAlgoButton.offsetHeight}px`
  const divWidth: string=  `${chooseAlgoButton.offsetWidth}px`
  const algoChoices:string[] = ['BFS', 'DFS', 'A*']

  if (chosenAlgo) document.body.classList.add('active-modal')
  else document.body.classList.remove('active-modal')


  return (
    <div className="modal">
      <div className='modal-overlay' onClick={()=>setChooseAlgoModal(!chooseAlgoModal)}>
          <div 
              className="modal-content fdc" 
              style={{left: posLeft, top: posTop, minWidth: divWidth}}>
            {algoChoices.map((algo: string, idx: number)=>

              <p className='udc' key={idx} style={{color:'black'}} onClick={()=> setChosenAlgo(algo)}>
                {algo}
              </p>
            
            )}
          </div>
      </div>
    </div>
  )
}

export default ChooseAlgoModal
