import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, useParams, useRouteMatch, Link} from 'react-router-dom';
import axios from 'axios';
import './Resumen.css';
import { Boton } from '../../shared/components/Boton';
import { CuentaCorriente } from '../components/CuentaCorriente';

const moment = require('moment');

const calcularSaldo = (objCtaCte) => {
    return objCtaCte.reduce((acc, curr)=> {
        return curr.IDp !== null ? acc - curr.Haber : acc + curr.Debe;
    }, 0);
};

export const Resumen = ({clases}) => {
    let [listaEmb, setListaEmb]  = useState([]);
    let [llaves, setLlaves] = useState([]);
    let [ctacteCliente, setCtacteCliente] = useState(null);
    let {path} = useRouteMatch();
    let [cuentaCorriente, setCuentaCorriente] = useState([]);

      

    useEffect(()=> {
        axios.get('/api/db/resumen').then((response)=>{
            console.log(response.data);
            actualizarLista(response.data);
            const arrConsultas = response.data.map(el=>axios.get(`/api/db/clientes/${el.IDc}/cta-cte`));
            Promise.all(arrConsultas).then( res => {
                let newCtaCte = res.map(r => r.data);
                console.log("cuenta corriente: ",newCtaCte);
                setCuentaCorriente(newCtaCte);
            }).catch(error=>{throw error;});
        }).catch((error)=>{
            throw error;
        });
        
    }, []);

    useEffect(()=>{

        cuentaCorriente.forEach(ctacte => {
            if(ctacte.length === 0) return;

            let saldo = calcularSaldo(ctacte);

            console.log("saldo", saldo);

            setListaEmb((prevListaEmb)=> {
                let newListaEmb = prevListaEmb.map((emb)=>{
                    if(emb.IDc === ctacte[0].IDcl){
                        emb.Estado = saldo <= 0 ? "Al Día" : "Pendiente";
                        emb.Pendiente = saldo;
                    }
                    return emb;
                });
                return newListaEmb;
            });

        });

    }, [cuentaCorriente])

    const actualizarLista = (datos) => {
        setLlaves(Object.keys(datos[0]));
        setListaEmb(datos);
    }

    const mostrarCtacte = (id) => {
        let cuentaPorMostrar = cuentaCorriente.filter((cta)=> {
            return cta.length > 0 && cta[0].IDcl === id;
        })[0];
        setCtacteCliente(cuentaPorMostrar);
    }

    
    let titulos = llaves.filter((llave)=>llave !== 'IDc').map((llave)=> {
        return (
            <span key={llave} className={`simple-hover embarcaciones__titulo embarcaciones__titulo-${llave}`}>
                {llave}
            </span>
        )
    });

    let filas = listaEmb.map((emb)=> {
            return(
                <div key={`${emb.ID}-${emb.Cliente}`} className="embarcaciones__embarcacion">
                
                {
                    llaves.filter((llave)=>llave !== 'IDc').map((llave)=> {
                        return(
                            <span key={llave} className={`${llave === 'Embarcacion' || llave === 'Cliente' || llave === 'Estado' ? 'simple-hover': '' } embarcaciones__campo embarcacion__${llave}`}>
                                {
                                    llave === 'Embarcacion' ? <Boton path={`/embarcaciones/${emb.ID}`}>{emb[llave]}</Boton>
                                    : llave === 'Cliente' ? <Boton path={`/clientes/${emb.IDc}`} >{emb[llave]}</Boton> 
                                    : llave === 'Estado' ? emb[llave] === "Sin Datos" ? emb[llave] : <div onClick={()=> mostrarCtacte(emb.ID)} >{emb[llave]}</div> 
                                    : llave === 'Contrato' || llave === 'Seguro' ? moment(emb[llave]).format('DD[-]MM[-]YYYY') 
                                    : emb[llave]
                                }
                            </span>
                        )
                    })
                }

                </div>
            )
        });

    return(

        ctacteCliente ? <CuentaCorriente ctacte={ctacteCliente} /> :  

        <div className={`embarcaciones ${clases}`}>

            <div className="embarcaciones__titulos">
                {titulos}
            </div>

            <div className="embarcaciones__lista">
                {filas}
            </div>
            <div className="embarcaciones__flag">
                flags
            </div>
            
        </div>
    )
}