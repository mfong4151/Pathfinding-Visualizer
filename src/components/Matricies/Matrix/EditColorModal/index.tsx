import { useState } from "react";
import EditTileColorModal from './EditTileColorModal';

interface Props {
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
  
const EditColorModal:React.FC<Props> = ({position, colorModalState, color1, color2, color3, color4}) => {
    const [subModalPos, setSubModalPos] = useState<{left: number; top: number}>({left: 0, top: 0});
    const [tileColorModal, setTileColorModal] = useState(false);
  
    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      const button = e.target as HTMLButtonElement;
      const { offsetLeft, offsetTop } = button;
      setSubModalPos({ left: offsetLeft, top: offsetTop });
      setTileColorModal(true);
    };
  
    return (
      <div className="modal">
        <div className="modal-overlay" onClick={() => colorModalState.setEditColorModal(false)}>
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
        {tileColorModal && <EditTileColorModal position={{left: subModalPos.left, top:subModalPos.top}} editTileState={{tileColorModal, setTileColorModal}}/>}
      </div>
    );
  };
  
  export default EditColorModal;