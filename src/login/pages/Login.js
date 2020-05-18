import React from 'react';

import './Login.cssS'

export const Login = () => {
    return (
        <div className="contenedor">
            <div className="card">
                <form action="" method="post" className="formulario-login" id="formulario-login">
                    <input type="text" className="formulario-entrada" name="usuario" id="usuario" />
                    <input type="text" className="formulario-entrada" name="pass" id="pass"/>
                <input type="submit" value="" className="formulario-submit boton"/>
            </form>
            </div>
        </div>
    )
}