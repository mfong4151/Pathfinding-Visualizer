import { activeColor } from "../../../../../types/objects";
import { FC} from "react";
import { ColorResult, SketchPicker } from "@hello-pangea/color-picker";
import '../../EditColorModal/EditColorModal.css';
import {CloseButton} from "../../../../SVGS";
import { StateSetter } from "../../../../../types/setState";

interface Props {
    position: { left: number; top: number };
    editTileState:{
      tileColorModal: boolean
      setTileColorModal: StateSetter<boolean>
    }
    activeColor: activeColor | null
  }

const EditTileColorModal: FC<Props> = ({ position, editTileState, activeColor}) => {

    
    const setColor = activeColor?.setColor;
    
    const handleOnClick = (e:any):void =>{
      e.stopPropagation();
      e.preventDefault();
      
    }
    

    //Dont try and simplify this, color picker is picky about how the on change is given
    const handleOnChange = (colorResult: ColorResult):void =>{
      setColor!( colorResult.hex)
    }
    
    return (
        <div className="modal" >
          <div className="modal-overlay" onClick={() => editTileState.setTileColorModal(false)}>
            <div className="modal-content color-picker-modal" style={{ left: position.left, top: position.top}}  onClick={handleOnClick}>
                 {/* <div className="close-button-holder">
                    <CloseButton/>
                  </div> */}
                <SketchPicker onChange={handleOnChange}/>
              </div>
          </div>
        </div>
      );
    };
    
    export default EditTileColorModal;