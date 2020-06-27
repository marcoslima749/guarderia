import React from 'react';

import './Entrada.css';

export const Entrada = ({value, name, handleChange}) => {
    return (
        <div className="entrada__campo">
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