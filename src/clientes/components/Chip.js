import React from 'react';
import './Chip.css';

export const Chip = ({handleClick = ()=>{}, value, handleEliminar, ind, clases=''}) => {    
    let eliminar = (e)=> {
        e.stopPropagation();
        handleEliminar(ind);
    }

    return(
        <span className={`chip__container ${clases}`} onClick={handleClick}>
            <div className="chip__valor">
            {value}
            </div>
            <div onClick={eliminar} className="chip__cerrar">
                &times;
            </div>
        </span>
    )
}