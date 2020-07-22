import React from 'react';

import './Entrada.css';

export const Entrada = ({placeHolder = '', id ,tipo = "text", value, name, handleChange, handleEnter = ()=>{}, clases}) => {


    return (
        <div className={`entrada__campo ${clases ? clases : ''}`}>
            <input 
                type={tipo}
                onChange={handleChange ? (e)=>handleChange(e, id) : ''}
                name={name}
                spellCheck="false"
                className="entrada__input"
                value={value ? value : ''}
                onKeyUp={(e)=>{handleEnter(e)}}
                placeholder={placeHolder}
            />
        </div>
    )
}