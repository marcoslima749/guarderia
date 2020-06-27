import React from 'react';
import { Entrada } from '../../shared/components/Entrada';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useRouterMatch, useParams } from 'react-router-dom';
import './Embarcacion.css';

export const Embarcacion = () => {
    let [embarcacion, setEmbarcacion] = useState({});
    let [llaves, setLlaves] = useState([]);
    let params = useParams();

    useEffect(() =>{
        console.log('render')
        axios.get(`/api/db/embarcaciones/${params.id}`).then((response)=>{
            let emb = response.data[0];
            delete emb.contrato;
            delete emb.seguro;
            delete emb.baja;
            setEmbarcacion(response.data[0]);
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
                    <div className={`embarcacion__${llave}`}>
                        <span className={`embarcacion__${llave}__label`}>{llave}: </span>
                        <Entrada name="marca" value={embarcacion[llave]} clases={`embarcacion__${llave}__input`} />
                    </div>         
                )
            }) : '...'}

        </div>
    )
};

