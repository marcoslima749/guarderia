import React from 'react';

import Gaviota from '../components/gaviota.svg';

import './home.css'

import { Pie } from '../components/Footer';
import { Cabecera } from '../components/Cabecera';

export const Home = () => {
    return(
        <div className="contenedor">

            <Cabecera/>

            <main class="principal">
                <h1 className="titulo">Club de Yates Naval Motor</h1>
                <h4 className="subtitulo">Los mejores servicios en un entorno soñado.</h4>
                <img height="400px"  className="gaviota" src={Gaviota} alt="Gaviota en vuelo" />
            </main>

            <Pie/>
        </div>
    )
}