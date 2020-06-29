import React from 'react';
import { Entrada } from '../../shared/components/Entrada';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useRouterMatch, useParams } from 'react-router-dom';
import './Embarcacion.css';

const moment = require('moment');

export const Embarcacion = () => {
    let [embarcacion, setEmbarcacion] = useState({});
    let [llaves, setLlaves] = useState([]);
    let [propietario, setPropietario] = useState();
    let params = useParams();

    useEffect(() =>{
        console.log('render')
        axios.get(`/api/db/embarcaciones/${params.id}`).then((response)=>{
            setEmbarcacion(response.data[0]);
        });

        axios.get(`/api/db/embarcaciones/${params.id}/cl`).then((response)=>{
            setPropietario(response.data);
        });
        

    }, [params.id]);

    useEffect(()=> {
        console.log('embarcacion: ', embarcacion);
        setLlaves(Object.keys(embarcacion));
    }, [embarcacion])

    return(
        <div className="embarcacion__container">

            <div className="embarcacion__nombre">
                <Entrada name="nombre" value={embarcacion.nombre} clases="embarcacion__nombre__input" />
            </div>

            {embarcacion ? llaves.filter((llave)=>llave !== 'nombre').map((llave)=>{

                return(
                    <div className={`embarcacion__campo embarcacion__${llave}`}>
                        <span className={`embarcacion__llave embarcacion__${llave}__label`}>{llave}: </span>
                        <Entrada name="marca" value={llave === 'contrato' || llave === 'seguro' ? moment(embarcacion[llave]).format('DD[/]MM[/]YYYY') : embarcacion[llave]} clases={`embarcacion__${llave}__input`} />
                    </div>         
                )
            }) : '...'}
            
            <div className="embarcacion__propietarios">
            <span className="embarcacion__propietarios__label">
                Propietarios: 
            </span>
            {propietario && propietario.map((prop, ind)=> {
                return(
                    <>
                    <div className="embarcacion__propietario__campo">
                    <span className="embarcacion__propietario__nombre__label">Nombre:</span>
                    <Entrada name={`propietario${ind}`} value={prop.cliente} clases={`embarcacion__propietario__nombre__input`} />
                    </div>

                    <div className="embarcacion__propietario__campo">
                    <span className="embarcacion__propietario__posesion__label">%:</span>
                    <Entrada name={`propietario${ind}`} value={prop.posesion} clases={`embarcacion__propietario__posesion__input`} />
                    </div>
                    </>
                )
            })}
            </div>

        </div>
    )
};

