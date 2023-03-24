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
  const {chooseAlgoModal, setChooseAlgoModal} = chooseModalState;

  const algoChoices:string[] = ['BFS', 'DFS', 'A*']
  if (chosenAlgo) document.body.classList.add('active-modal')
  else document.body.classList.remove('active-modal')


  return (
    <div className="modal">
      <div className='modal-overlay' onClick={()=>setChooseAlgoModal(!chooseAlgoModal)}>
          <div className="modal-content fdc">
            {algoChoices.map((algo: string, idx: number)=>
              <p key={idx} style={{color:'black'}} onClick={()=> setChosenAlgo(algo)}>
                {algo}
              </p>
            
            
            )}
          </div>
      </div>
    </div>
  )
}

export default ChooseAlgoModal
