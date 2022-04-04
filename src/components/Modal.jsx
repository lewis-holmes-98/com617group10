import { React, useEffect } from "react";
import { ReactDOM, createPortal } from "react-dom";

const Modal =({ obj, isOpen, onClose, children })=> {
    if (!isOpen) return null;
    return ReactDOM.createPortal(
       <div className="modal">
        <span>{obj}</span>
        <button onClick={onClose}>Close</button>
       </div>
      ,document.body);
    }

export default Modal;