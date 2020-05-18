import React from 'react'
import { Link } from 'react-router-dom';

export const Cabecera = () => {
    return(
        <header class="header">
            <div className="software">
                <h1 className="nombre">Guarderia-UI</h1>
                <p className="separador">|</p>
                <p className="descripcion">Software de gestión administrativa para empresas</p>
            </div>
            <div className="panel">
                <Link to="/register" className="accion">Registrarse</Link>
                <Link to="/login" className="accion">Ingresar</Link>
            </div>
        </header>
    )
}