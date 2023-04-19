import { ColorResult, SliderPicker } from "@hello-pangea/color-picker";
import { setBoolean, setString } from "../../../../types/setState";
import { activeColor } from "../../../../types/objects";

interface Props {
    position: { left: number; top: number };
    editTileState:{
      tileColorModal: boolean
      setTileColorModal: setBoolean
    }
    activeColor: activeColor | null
  }

const EditTileColorModal: React.FC<Props> = ({ position, editTileState, activeColor}) => {

    const customStyle = { left: position.left, top: position.top, height:`40px`, width:`200px`}
    const setColor = activeColor?.setColor
    
    const handleOnClick = (e:any):void =>{
      e.stopPropagation();
      e.preventDefault();
      
    }
  
    const handleOnChange = (colorResult: ColorResult):void =>{
      setColor!(prev => colorResult.hex)
    }
    


    return (
        <div className="modal" >
          <div className="modal-overlay" onClick={() => editTileState.setTileColorModal(prev => false)}>
            <div className="modal-content" style={customStyle}  onClick={handleOnClick}>
              <SliderPicker onChange={handleOnChange}/>
              </div>
          </div>
        </div>
      );
    };
    
    export default EditTileColorModal;