//general outline for a modal, not to be used in production

import React, { SetStateAction } from "react";

interface Props{
  
   state: boolean;
   setState: React.Dispatch<SetStateAction<boolean>>;
}
  


const ChooseAlgoModal: React.FC<Props> = ({state, setState}) => {
  
  
  
    if (state) document.body.classList.add('active-modal')
    else document.body.classList.remove('active-modal')
  
  
    return (
      <div className="modal">
        <div className='modal-overlay' onClick={()=>setState(!state)}>
            <div>
  
            
            </div>
        </div>
      </div>
    )
  }
  
  export default ChooseAlgoModal
  