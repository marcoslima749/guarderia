import React from 'react';
import './Chip.css';

export const Chip = ({value, handleEliminar, ind}) => {
    return(
        <span className="chip__container">
            <div className="chip__valor">
            {value}
            </div>
            <div onClick={()=>handleEliminar(ind)} className="chip__cerrar">
                &times;
            </div>
        </span>
    )
}