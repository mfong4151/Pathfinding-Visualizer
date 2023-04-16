import { SliderPicker } from "@hello-pangea/color-picker";

interface ModalProps {
    position: { left: number; top: number };
    colorModalState:{
      colorModal:string;
      setColorModal:React.Dispatch<React.SetStateAction<string>>
    }
  }
  
const EditColorModal: React.FC<ModalProps> = ({ position, colorModalState}) => {

  const handleOnClick = (e:any):void =>{
    e.stopPropagation();
    e.preventDefault();
    
  }

    return (
      <div
        className="modal"
      >
        <div className="modal-overlay" onClick={() => colorModalState.setColorModal(prev => '')}>
          <div className="modal-content" 
                style={{ left: position.left, top: position.top, height:`200px`, width:`200px`}}
                onClick={handleOnClick}
                >
            <SliderPicker/>
            </div>
        </div>
      </div>
    );
  };
  
  export default EditColorModal;