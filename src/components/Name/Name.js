import React from "react";
import  ReactDOM  from "react-dom";
import './Name.css';

function Name({children}){
    return ReactDOM.createPortal(
        <div className="nameModal">
            <div className="nameModalContent">
            {children}
            </div>
        </div>,
        document.getElementById('modal')
    )
}

export {Name}