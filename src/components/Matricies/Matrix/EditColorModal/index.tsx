
interface ModalProps {
    position: { left: number; top: number };
    colorModalState:{
      editColorModal:boolean;
      setEditColorModal:React.Dispatch<React.SetStateAction<boolean>>
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
        <div className="modal-overlay" onClick={() => colorModalState.setEditColorModal(prev => false)}>
          <div className="modal-content" 
                style={{ left: position.left, top: position.top, height:`200px`, width:`200px`}}
                onClick={handleOnClick}
                >


            </div>
        </div>
      </div>
    );
  };
  
  export default EditColorModal;