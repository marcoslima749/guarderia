import React from 'react';

import {Principal} from '../components/Principal';

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
            

            <Principal/>


            <Pie/>
        </div>
    )
}