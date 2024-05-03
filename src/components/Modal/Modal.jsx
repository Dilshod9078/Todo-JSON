import React from 'react'
import './Modal.css'

import ExitBtn from '../../assets/Images/exit-icon.svg'

function Modal({children, modal, setModal}) {


const exitBtnClick = (evt) =>{
    if(evt.target.id == "modal-wrapper"){
       setModal(false)
    }
}

  return (
    <div onClick={exitBtnClick} id="modal-wrapper" className={` transition-[0.4s] modal ${modal ? "" : "scale-0"}`}>
     <div className="modal-content relative">
        <button onClick={() => setModal(false)}  className={`absolute right-[10px] top-[10px] transition-[0.4s] ${modal ? "" : "scale-0"}`}>
            <img src={ExitBtn} alt="Exit icon" width={20} height={20} />
        </button>
        {children}
     </div>
    </div>
  )
}

export default Modal