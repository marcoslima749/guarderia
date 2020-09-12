import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



export const CuentaCorriente = () => {
    let [cuotas, setCuotas] = useState([]);
    let [tasas, setTasas] = useState([]);
    let [pagos, setPagos] = useState([]);

    let params = useParams();

    useEffect(()=>{

        //Usar Promise.All para utilizar los valores o directamente la consulta completa.
        //Decidir cuál de los dos
    

        axios.get(`/api/db/clientes/${params.id}/cta-cte/cuotas`).then(response =>{
            console.log(JSON.parse(JSON.stringify(response.data)))
            setCuotas(JSON.parse(JSON.stringify(response.data)));
        }).catch(error => {
            throw error;
        });

        axios.get(`/api/db/clientes/${params.id}/cta-cte/tasas`).then(response => {
            setTasas(JSON.parse(JSON.stringify(response.data)));
        }).catch(error => {
            throw error;
        });

        axios.get(`/api/db/clientes/${params.id}/cta-cte/pagos`).then(response => {
            setPagos(JSON.parse(JSON.stringify(response.data)));
        }).catch(error => {
            throw error;
        });

    },[params.id]);
    


    return(

        <div>
            {JSON.stringify(cuotas,null,3)}
        </div>

    )
}
