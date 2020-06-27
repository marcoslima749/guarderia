import React from 'react';

import './Entrada.css';

export const Entrada = ({value, name, handleChange, clases}) => {
    return (
        <div className={`entrada__campo ${clases ? clases : ''}`}>
            <input 
                type="text"
                onChange={(e)=>handleChange(e)}
                name={name}
                spellCheck="false"
                className="entrada__input"
                value={value ? value : ''}
            />
        </div>
    )
}