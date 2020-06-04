import React from 'react';
import { Boton } from '../../shared/components/Boton';
import './register.css';

export const Register = () => {
    return (
        <div className="register__container">
        <h2>No se permite el registro de nuevos usuarios. Contáctese con el Administrador.</h2>
        <br/>
        <Boton path="/" caption="Inicio" clases="boton fondo-azul boton--panel" />
        </div>
    )
}