import React from 'react'
import { useLocation } from 'react-router-dom';
import './Banner.css'

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

interface MapLocation {
  [key: string]: string[];
}

const MAP_LOCATION: MapLocation = {
  '/matricies':['BFS', 'DFS', 'Best First Search', 'Bidirectional BFS'],
  '/trees':["Inorder DFS", "Preorder DFS", "Postorder DFS", "BFS"],
}

const ChooseAlgoModal: React.FC<Props> = ({chooseModalState, chooseAlgoState, chooseAlgoButton}) => {
  const {chosenAlgo, setChosenAlgo} = chooseAlgoState; 
  const {chooseAlgoModal, setChooseAlgoModal} = chooseModalState;
  const posLeft: string = `${chooseAlgoButton.offsetLeft}px`
  const posTop: string = `${chooseAlgoButton.offsetTop +chooseAlgoButton.offsetHeight}px`
  const divWidth: string=  `${chooseAlgoButton.offsetWidth}px`
  const location = useLocation();
  const algoChoices:string[] = MAP_LOCATION[location.pathname] ? MAP_LOCATION[location.pathname]: []

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
