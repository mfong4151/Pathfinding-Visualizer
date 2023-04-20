import { ColorResult, SketchPicker } from "@hello-pangea/color-picker";
import { setBoolean, setString } from "../../../../types/setState";
import { activeColor } from "../../../../types/objects";
import '../../EditColorModal/EditColorModal.css';

interface Props {
    position: { left: number; top: number };
    editTileState:{
      tileColorModal: boolean
      setTileColorModal: setBoolean
    }
    activeColor: activeColor | null
  }

const EditTileColorModal: React.FC<Props> = ({ position, editTileState, activeColor}) => {

    
    const setColor = activeColor?.setColor;
    
    const handleOnClick = (e:any):void =>{
      e.stopPropagation();
      e.preventDefault();
      
    }
    

    //Dont try and simplify this, color picker is picky about how the on change is given
    const handleOnChange = (colorResult: ColorResult):void =>{
      setColor!(prev => colorResult.hex)
    }
    


    return (
        <div className="modal" >
          <div className="modal-overlay" onClick={() => editTileState.setTileColorModal(prev => false)}>
            <div className="modal-content color-picker-modal" style={{ left: position.left, top: position.top}}  onClick={handleOnClick}>
              <SketchPicker onChange={handleOnChange}/>
              </div>
          </div>
        </div>
      );
    };
    
    export default EditTileColorModal;