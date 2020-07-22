import React from 'react';

export const FlagModificado = ({guardar, descartar, clasesLabel, clasesBoton}) => {
    return (
        <>
            <span className={clasesLabel}>Datos Modificados</span>
            <button onClick={guardar} className={clasesBoton} >GUARDAR</button>
            <button onClick={descartar} className={clasesBoton} >DESCARTAR</button>
        </>
    )
};