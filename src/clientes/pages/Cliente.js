import React from 'react';
import { Entrada } from '../../shared/components/Entrada';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useRouterMatch, useParams } from 'react-router-dom';

import './Clientes.css';

export const Cliente = () => {
    let [cliente, setCliente] = useState({});
    let [mails, setMails] = useState([]);
    let [telefonos, setTelefonos] = useState([]);
    let [formaPago, setFormaPago] = useState([]);
    let [formaFacturacion, setFormaFacturacion] = useState([]);
    let params = useParams();

    useEffect(() =>{
        console.log('render')
        axios.get(`/api/db/clientes/${params.id}`).then((response)=>{
            setCliente(response.data[0]);
        });
        
        axios.get(`/api/db/clientes/${params.id}/m`).then((response)=>{
            setMails(response.data);
        });

        axios.get(`/api/db/clientes/${params.id}/t`).then((response)=>{
            setTelefonos(response.data);
        });

        axios.get(`/api/db/clientes/${params.id}/f`).then((response)=>{
            setFormaFacturacion(response.data[0]);
        });
        
        axios.get(`/api/db/clientes/${params.id}/p`).then((response)=>{
            setFormaPago(response.data);
        });

    }, [params.id]);

    
    return(
        <div className="clientes__container">
        <h1>cliente</h1>
        <pre>
            {JSON.stringify(cliente, null, 3)}
            {JSON.stringify(mails,null,3)}
            {JSON.stringify(telefonos,null,3)}
            {JSON.stringify(formaPago,null,3)}
            {JSON.stringify(formaFacturacion,null,3)}
        </pre>
        </div>
    )
};