import React from 'react';
import { Entrada } from '../../shared/components/Entrada';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useRouterMatch, useParams } from 'react-router-dom';
import { Boton } from "../../shared/components/Boton";
import './Embarcacion.css';

const moment = require('moment');

export const Embarcacion = () => {
    let [embarcacion, setEmbarcacion] = useState({});
    let [llaves, setLlaves] = useState([]);
    let [propietario, setPropietario] = useState();
    let [modificado, setModificado] = useState(false);
    let [snapEmb, setSnapEmb] = useState();
    let params = useParams();

    useEffect(() =>{
        console.log('render')
        axios.get(`/api/db/embarcaciones/${params.id}`).then((response)=>{
            let res = response.data[0];
            res.contrato = moment(res.contrato).format('YYYY[-]MM[-]DD');
            console.log('seguro: ', res.seguro)
            res.seguro = moment(res.seguro).format('YYYY[-]MM[-]DD');
            setSnapEmb(res);
            setEmbarcacion(res);
        });

        axios.get(`/api/db/embarcaciones/${params.id}/cl`).then((response)=>{
            setPropietario(response.data);
        });
        

    }, [params.id]);

    useEffect(()=> {
        console.log('embarcacion: ', embarcacion);
        //Asigna las llaves para renderizar después de tener los datos.
        setLlaves(Object.keys(embarcacion));

        //Compara el state para ver si hay cambios
        let cambio = false;
        
        for(let propiedad in embarcacion) {
            if (embarcacion[propiedad] != snapEmb[propiedad]) {
                cambio = true;
            };
        }

        if(cambio) {
            setModificado(true);
        } else {
            setModificado(false);
        };

    }, [embarcacion])

    let handleChangeEmb = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;

        let newEmb = {...embarcacion, [name] : value}
        setEmbarcacion(newEmb);
    }

    let guardarCambios = () => {
        let campos = []
            Object.keys(embarcacion).forEach((llave)=> {
            if(embarcacion[llave] !== snapEmb[llave]) {
                campos.push(llave);
            }
        });
        if (campos.length === 0) { //Los campos son iguales, no hay modificación
            console.log('los campos son iguales, no hay modificacion. Embarcacion : ', embarcacion, ' Snap: ', snapEmb)
            return;
        } else { //Hay campos modificados, mandar consulta
            //formatea las fechas para la base de datos
            if(campos.includes('contrato') || campos.includes('seguro') || campos.includes('baja')) {
                embarcacion.contrato = moment(embarcacion.contrato).isValid() ? moment(embarcacion.contrato).format('YYYY[-]MM[-]DD') : null;
                embarcacion.seguro = moment(embarcacion.seguro).isValid() ? moment(embarcacion.seguro).format('YYYY[-]MM[-]DD') : null;
                console.log('contrato: ',embarcacion.contrato,'seguro: ',embarcacion.seguro);
                //agregar la lógica para la baja
            }
            axios.put(`/api/db/embarcaciones/${embarcacion.Id}/m`, {embarcacion, campos}).then((response)=> {
                console.log('Base consultada correctamente, respuesta: ', response);
                //Para no hacer la consulta a la base al pedo
                //sacar comentario para probar
                //setSnapEmb(embarcacion);
            }).catch((err)=> {
                console.log(err);
            })
        }
    }

    let descartarCambios = () => {
        setEmbarcacion(snapEmb);
    }


    return(
        <div className="embarcacion__container">

            <div className="embarcacion__nombre">
                <Entrada handleChange={handleChangeEmb} name="nombre" value={embarcacion.nombre} clases="embarcacion__nombre__input" />
            </div>

            {embarcacion ? llaves.filter((llave)=>llave !== 'nombre').map((llave)=>{

                return(
                    llave === 'Id' ? 
                    <div className={`embarcacion__campo embarcacion__${llave}`}>
                        <span className={`embarcacion__llave embarcacion__${llave}__label`}>{llave}: </span>
                        <span name={llave} className={`embarcacion__${llave}__span entrada__input`}>{embarcacion[llave]}</span>
                    </div>
                    :
                    llave === 'contrato' || llave === 'seguro' || llave === 'baja' ? 
                    <div className={`embarcacion__campo embarcacion__${llave}`}>
                        <span className={`embarcacion__llave embarcacion__${llave}__label`}>{llave}: </span>
                        <input type="date" onChange={(e)=>handleChangeEmb(e)} name={llave} value={/*llave === 'contrato' || llave === 'seguro' ? moment(embarcacion[llave]).format('DD[/]MM[/]YYYY') : */ embarcacion[llave]} className={`embarcacion__${llave}__input`} />
                    </div>
                    :
                    <div className={`embarcacion__campo embarcacion__${llave}`}>
                        <span className={`embarcacion__llave embarcacion__${llave}__label`}>{llave}: </span>
                        <Entrada handleChange={handleChangeEmb} name={llave} value={/*llave === 'contrato' || llave === 'seguro' ? moment(embarcacion[llave]).format('DD[/]MM[/]YYYY') : */ embarcacion[llave]} clases={`embarcacion__${llave}__input`} />
                    </div>
                )
            }) : '...'}
            
            <div className="embarcacion__propietarios">
                <span className="embarcacion__propietarios__label">
                    Propietarios: 
                </span>
                {propietario && propietario.map((prop)=> {
                    return(
                        <>
                        <div className="embarcacion__propietario__campo">
                        <span className="embarcacion__propietario__nombre__label">Nombre:</span>
                        <Boton path={`/clientes/${prop.id}`}  clases={`embarcacion__propietario__nombre__boton simple-hover`} >{prop.nombre}</Boton>
                        </div>

                        <div className="embarcacion__propietario__campo">
                        <span className="embarcacion__propietario__apellido__label">Apellido:</span>
                        <Boton path={`/clientes/${prop.id}`} clases={`embarcacion__propietario__apellido__boton simple-hover`}>{prop.apellido}</Boton>
                        </div>

                        <div className="embarcacion__propietario__campo">
                        <span className="embarcacion__propietario__posesion__label">%:</span>
                        <span  className={`embarcacion__propietario__posesion__span`}>{prop.posesion}</span>
                        </div>
                        </>
                    )
                })}
            </div>
            
            <div className={`embarcacion__flag ${modificado ? 'embarcacion__flag--visible' : ''}`}>
            {modificado ?
                <>
                <span className="embarcacion__flag__label">Datos Modificados</span>
                <button onClick={guardarCambios} className="embarcacion__flag__boton simple-hover">GUARDAR</button>
                <button onClick={descartarCambios} className="embarcacion__flag__boton simple-hover">DESCARTAR</button>
                </>
            :''
            }
            </div>
        </div>
    )
};

