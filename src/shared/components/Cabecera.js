import React from 'react';

import './Cabecera.css';

import { Boton } from './Boton';

export const Cabecera = ({
    nombre = "Guarderia-UI",
    descripcion = "Software de gestión administrativa para empresas",
    panel = []
}) => {


    return(
        <header className="cabecera">
            <div className="software">
                <h1 className="nombre">{nombre}</h1>
                <p className="separador">|</p>
                <p className="descripcion">{descripcion}</p>
            </div>
            <div className="panel">
            { panel.length > 0 ?
                panel :
                <>
                <Boton path="/register" caption="Registrarse" clases="boton--accion boton--panel" />
                <Boton path="/login" caption="Ingresar" clases="boton--accion boton--panel" />
                </>
                }
            </div>
        </header>
    )
}