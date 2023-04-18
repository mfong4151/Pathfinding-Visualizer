import { useRef } from "react";

interface ModalProps {
    position: { left: number; top: number };
    colorModalState:{
      editColorModal:boolean;
      setEditColorModal:React.Dispatch<React.SetStateAction<boolean>>
    }
    color1:string
    color2:string
    color3:string
    color4:string
    
  }
  
const EditColorModal: React.FC<ModalProps> = ({ position, colorModalState, color1, color2, color3, color4}) => {
  const color1Ref = useRef<HTMLButtonElement>(null);
  const color2Ref = useRef<HTMLButtonElement>(null);
  const color3Ref = useRef<HTMLButtonElement>(null);
  const color4Ref = useRef<HTMLButtonElement>(null);



  const handleOnClick = (e:any):void =>{
    e.stopPropagation();
    e.preventDefault();
    
  }

    return (
      <div
        className="modal"
      >
        <div className="modal-overlay" onClick={() => colorModalState.setEditColorModal(prev => false)}>
          <div className="modal-content fdc sb" 
                style={{ left: position.left, top: position.top, height:`200px`, width:`200px`}}
                onClick={handleOnClick}
                >
                
                <button className="edit-color-tile" style={{backgroundColor:color1}} ref={color1Ref}>

                </button>
                <button className="edit-color-tile" style={{backgroundColor:color2}} ref={color2Ref}>

                </button>
                <button className="edit-color-tile" style={{backgroundColor:color3}} ref={color3Ref}>

                </button>
                <button className="edit-color-tile" style={{backgroundColor:color4}} ref={color4Ref}>

                </button>

            </div>
        </div>
      </div>
    );
  };
  
  export default EditColorModal;