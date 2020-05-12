import React from 'react'

export const Cabecera = () => {
    return(
        <header class="header">
            <div className="software">
                <h1 className="nombre">Guarderia-UI</h1>
                <p className="separador">|</p>
                <p className="descripcion">Software de gestión administrativa para empresas</p>
            </div>
            <div className="panel">
                <a href="#" className="accion">Registrarse</a>
                <a href="#" className="accion">Ingresar</a>
            </div>
        </header>
    )
}