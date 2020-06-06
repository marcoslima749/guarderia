import React from 'react';
import {useState , useEffect} from 'react';

import './Login.css'

import { Link } from 'react-router-dom';
import { Boton } from '../../shared/components/Boton';

export const Login = () => {
    //Se quita la clase login__container--transparente al montar el componente
    //usando useEffect para crear el efecto de fade in
    let [clase, setClase] = useState("login__container--transparente");

    useEffect(()=>{
        setClase("");
    },[]);

    return (
        <div className={`login__container ${clase}`}>
            <div className="login__card">
            <Link to="/" className="login__cerrar" >X</Link>
                <h2 className="login__titulo">INGRESO</h2>
                <form action="" method="post" className="login__formulario" id="login__formulario">
                    <div className="login__campo">
                        <input type="email" className="login__entrada login__entrada-usuario" name="usuario" id="usuario" placeholder=" " />
                        <label className="login__label" htmlFor="usuario">Usuario</label>
                    </div>
                    <div className="login__campo">
                        <input type="password" className="login__entrada login__entrada-pass" name="pass" id="pass"  placeholder=" "/>
                        <label className="login__label" htmlFor="pass">Contraseña</label>
                    </div>
                </form>
                <Boton path="/inicio" caption="INGRESAR" clases="login__boton-submit" />
            </div>
        </div>
    )
}