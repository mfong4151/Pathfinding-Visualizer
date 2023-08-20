import React, { useRef, useState, FC } from "react";
import './EditColorModal.css'
import { ColorStates } from "../../../../types/interface";
import { activeColor } from "../../../../types/objects";
import EditTileColorModal from "./EditTileColorModal";
import {CloseButton} from "../../../SVGS";
import makeColorTransition from "../../../../utils/makeColorTransition";
import useEditColorStates from "../../../../hooks/useCustomColorStates";
interface Props {
    position: { left: number; top: number };
    colorModalState:{
      editColorModal:boolean;
      setEditColorModal:React.Dispatch<React.SetStateAction<boolean>>
    }

   
}

const EditColorModal:FC<Props> = ({position, colorModalState}) => {
    const [subModalPos, setSubModalPos] = useState<{left: number; top: number}>({left: 0, top: 0});
    const [tileColorModal, setTileColorModal] = useState(false); 
    const activeColorRef = useRef<activeColor| null>(null)
    const {color1, setColor1, color2, color3, color4, setColor2, setColor3, setColor4, customTransition, setCustomTransition} =useEditColorStates()
    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      const button = e.target as HTMLButtonElement;

      switch(button.id){

        case 'color1':
          activeColorRef.current = {color: color1, setColor: setColor1}
          break
        case 'color2':
          activeColorRef.current = {color: color2, setColor: setColor2}
          break
        case 'color3':
          activeColorRef.current = {color: color3, setColor: setColor3}
          break
        case 'color4':
          activeColorRef.current = {color: color4, setColor: setColor4}
          break
        default:
          activeColorRef.current = null
          break
      }

      setCustomTransition(makeColorTransition(color1, color2, color3, color4))
      const { offsetLeft, offsetWidth, offsetTop, offsetHeight } = button;
      setSubModalPos(prev => ({ left: position.left + offsetLeft + offsetWidth, top: position.top + offsetTop + offsetHeight }));
      setTileColorModal(true);
    };
  
    return (
      <div className="modal">
        <div className="modal-overlay" onClick={() => colorModalState.setEditColorModal(false)}>
          <div className="modal-content edit-color-modal" style={{ left: position.left, top: position.top}}>
            <div className="edit-color-buttons fdc sb">
                  <div className="close-button-holder">
                    <CloseButton/>
                  </div>
                  <div className="change-color-holder"> 

                    <button id='color1' className="edit-color-tile" style={{backgroundColor:color1}} onClick={handleOnClick}/>
                    <p>Start</p>

                  </div>
                  <div className="change-color-holder"> 

                    <button id='color2' className="edit-color-tile" style={{backgroundColor:color2}} onClick={handleOnClick}/>
                     <p>Transition 1</p>

                  </div>
                  <div className="change-color-holder"> 
                    <button id='color3' className="edit-color-tile" style={{backgroundColor:color3}} onClick={handleOnClick}/>
                     <p>Transition 2</p>


                  </div>
                  <div className="change-color-holder"> 

                    <button id='color4' className="edit-color-tile" style={{backgroundColor:color4}} onClick={handleOnClick}/>
                     <p>End </p>

                  </div>

                  <div className="close-button-holder"/>

            </div>
          </div>
        </div>
        {tileColorModal && 

                        <EditTileColorModal 
                                position={{left: subModalPos.left, top:subModalPos.top}} 
                                editTileState={{tileColorModal, setTileColorModal}}
                                activeColor = {activeColorRef.current}
                                />}
      </div>
    );
  };
  
  export default EditColorModal;