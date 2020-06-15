import React from 'react';

import Gaviota from '../components/gaviota.svg';

import './home.css'

import { Pie } from '../../shared/components/Pie';
import { Cabecera } from '../../shared/components/Cabecera';
import { Boton } from '../../shared/components/Boton';


export const Home = () => {


    return(
        <div className="contenedor">

            <Cabecera nombre="Guarderia-UI" descripcion="Software de gestión administrativa para empresas">
                <Boton path="/register" clases="hover-claro boton--panel boton--cabecera">Registrarse</Boton>
                <Boton path="/login" clases="hover-claro boton--panel boton--cabecera">Ingresar</Boton>
            </Cabecera>
            

            <main className="principal">
                <h1 className="titulo">Club de Yates Naval Motor</h1>
                <h4 className="subtitulo">Los mejores servicios en un entorno soñado.</h4>
                <img height="400px"  className="gaviota" src={Gaviota} alt="Gaviota en vuelo" />
            </main>


            <Pie/>
        </div>
    )
}