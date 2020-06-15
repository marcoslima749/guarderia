import React from 'react';

import './Cabecera.css';

export const Cabecera = ({
    nombre = "Guarderia-UI",
    descripcion = "Software de gestión administrativa para empresas",
    children
}) => {


    return(
        <header className="cabecera">
            <div className="software">
                <h1 className="nombre">{nombre}</h1>
                <p className="separador">|</p>
                <p className="descripcion">{descripcion}</p>
            </div>
            <div className="panel">
                { children && children }
            </div>
        </header>
    )
}