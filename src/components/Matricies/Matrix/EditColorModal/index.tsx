import { useState } from "react";
import EditTileColorModal from './EditTileColorModal';

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
  
const EditColorModal: React.FC = () => {
    const [position, setPosition] = useState<{left: number; top: number}>({left: 0, top: 0});
    const [tileColorModal, setTileColorModal] = useState(false);
  
    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = event.target as HTMLButtonElement;
      const { offsetLeft, offsetTop } = button;
      setPosition({ left: offsetLeft, top: offsetTop });
      setTileColorModal(true);
    };
  
    return (
      <div className="modal">
        <div className="modal-overlay" onClick={() => setTileColorModal(false)}>
          <div className="modal-content fdc sb"
               style={{ left: position.left, top: position.top, height:`200px`, width:`200px`}}
          >
            <button className="edit-color-tile" onClick={handleOnClick}>
              Color 1
            </button>
            <button className="edit-color-tile" onClick={handleOnClick}>
              Color 2
            </button>
            <button className="edit-color-tile" onClick={handleOnClick}>
              Color 3
            </button>
            <button className="edit-color-tile" onClick={handleOnClick}>
              Color 4
            </button>
          </div>
        </div>
        {tileColorModal && <EditTileColorModal position={{left: position.left, top:position.top}} />}
      </div>
    );
  };
  
  export default EditColorModal;