import React from 'react';
import { Entrada } from '../../shared/components/Entrada';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useRouterMatch, useParams } from 'react-router-dom';

export const Embarcaciones = () => {
    let [embarcacion, setEmbarcacion] = useState({});
    let [llaves, setLlaves] = useState([]);
    let params = useParams();

    useEffect(() =>{
        console.log('render')
        axios.get(`/api/db/embarcaciones/${params.id}`).then((response)=>{
            setEmbarcacion(response.data[0]);
        });
    }, [params.id]);

    useEffect(()=> {
        console.log('embarcacion: ', embarcacion);
        setLlaves(Object.keys(embarcacion));
    }, [embarcacion])

    return(
        <div>
        <h1>embarcacion</h1>
        {embarcacion ? llaves.map((k) => <Entrada key={k} value={embarcacion[k]}/>) : 'Cargando...'}
        </div>
    )
};

