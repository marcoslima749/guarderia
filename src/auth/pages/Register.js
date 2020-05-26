import React from 'react';
import { Boton } from '../../shared/components/Boton';

export const Register = () => {
    return (
        <>
        <h2>No se permite el registro de nuevos usuarios. Contáctese con el Administrador.</h2>
        <Boton path="/" caption="Inicio" clases="fondo-azul boton--panel" />
        </>
    )
}