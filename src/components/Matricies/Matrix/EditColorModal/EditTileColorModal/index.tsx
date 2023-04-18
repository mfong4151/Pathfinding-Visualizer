import { SliderPicker } from "@hello-pangea/color-picker";
import { setBoolean, setString } from "../../../../types/setState";

interface Props {
    position: { left: number; top: number };
    editTileState:{
      tileColorModal: boolean
      setTileColorModal: setBoolean
    }
    // color:string
    // setColor: setString
  }

const EditTileColorModal: React.FC<Props> = ({ position, editTileState}) => {

    const customStyle = { left: position.left, top: position.top, height:`40px`, width:`200px`}

    const handleOnClick = (e:any):void =>{
      e.stopPropagation();
      e.preventDefault();
      
    }
  
      return (
        <div className="modal" >
          <div className="modal-overlay" onClick={() => editTileState.setTileColorModal(prev => false)}>
            <div className="modal-content" style={customStyle}  onClick={handleOnClick}
                  >
              <SliderPicker />
              </div>
          </div>
        </div>
      );
    };
    
    export default EditTileColorModal;