import React from 'react';
import { Entrada } from '../../shared/components/Entrada';
import './CampoEditable.css';

export const CampoEditable = ({id, entidad, llave, valor, handler, label, tipo = "text", showLabel = true, soloLectura = false, placeHolder = ''}) => {
    let display = soloLectura ?
    <div name={llave} className={`${entidad}__${llave}__span entrada__input`}>{valor}</div>
    :
    <Entrada placeHolder={placeHolder} id={id} tipo={tipo} handleChange={handler} name={llave} value={valor} clases={`${entidad}__${llave}__input`} />
    ;

    return (
        <div className={`${entidad}__campo ${entidad}__${llave}`}>
            {showLabel && <span className={`${entidad}__llave ${entidad}__${llave}__label`}>{label}: </span>}
            {display}
        </div>
    )
};