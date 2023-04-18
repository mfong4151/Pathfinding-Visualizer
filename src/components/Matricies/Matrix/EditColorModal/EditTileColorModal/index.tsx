import { SliderPicker } from "@hello-pangea/color-picker";

interface Props {
    position: { left: number; top: number };
    tileColorState:{
      editColorModal:boolean;
      setEditColorModal:React.Dispatch<React.SetStateAction<boolean>>
    }
  }

const EditTileColorModal: React.FC<Props> = ({ position, tileColorState}) => {

    const handleOnClick = (e:any):void =>{
      e.stopPropagation();
      e.preventDefault();
      
    }
  
      return (
        <div
          className="modal"
        >
          <div className="modal-overlay" onClick={() => tileColorState.setEditColorModal(prev => false)}>
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
    
    export default EditTileColorModal;