import React from 'react';
import { Entrada } from '../../shared/components/Entrada';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useRouterMatch, useParams } from 'react-router-dom';

export const Cliente = () => {
    let [cliente, setCliente] = useState({});
    let params = useParams();

    useEffect(() =>{
        console.log('render')
        axios.get(`/api/db/clientes/${params.id}`).then((response)=>{
            setCliente(response.data);
        });
    }, [params.id]);

    return(
        <div>
        <h1>cliente</h1>
        <pre>{JSON.stringify(cliente, null, 3)}</pre>
        </div>
    )
};