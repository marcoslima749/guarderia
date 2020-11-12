import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useRouterMatch, useParams } from 'react-router-dom';
import './Embarcacion.css';
import { FlagModificado } from '../components/FlagModificado';
import { Propietarios } from '../components/Propietarios';
import { CampoEditable } from '../components/CampoEditable';

const moment = require('moment');

export const Embarcacion = ({setHeader}) => {
    let [embarcacion, setEmbarcacion] = useState({});
    let [llaves, setLlaves] = useState([]);
    let [propietario, setPropietario] = useState();
    let [modificado, setModificado] = useState(false);
    let [snapEmb, setSnapEmb] = useState();
    let params = useParams();

    useEffect(()=> {
        setHeader.setNombreHeader("CYNM");
        setHeader.setDescripcionHeader("Embarcaciones");
        setHeader.setPanelHeader(null);
    },[]);

    let embarcacionNueva = {
        Id: "Nueva",
        categoria: "",
        contrato: "",
        eslora: "",
        manga: "",
        marca: "",
        matricula: "",
        modelo: "",
        nombre: "",
        puntal: "",
        seguro: "",
        tarifa: "",
        tasa: "",
        total: "",
        //sacar comentario cuando haya una baja:
        //baja: ""
    }

    let nuevoPropietario = [{
        id : "Nuevo",
        nombre : "",
        apellido : "",
        posesion: "" 
    }]

    useEffect(() =>{
        console.log('render')
        /*
        Los campos Tarifa Tasa Total dependen del rango de precio asignado y la tarifa actual de ese rango.
        Hay que sacar esos campos y poner el rango de precio para asignarlo en la creación.
        Son tablas distintas y tendría que hacer una ruta post y consulta nuevas para asignar:

        -Rango de precios
        -Descuento
        -Propietarios (si existe seleccionar de una lista, si no crearlo. Ver la posibilidad de que sean más de uno)

        if(params.id === "new") {
            setSnapEmb(embarcacionNueva);
            setEmbarcacion(embarcacionNueva);
            setPropietario(nuevoPropietario);
            return;
        }

        */
        axios.get(`/api/db/embarcaciones/${params.id}`).then((response)=>{
            let res = response.data[0];
            res.contrato = moment(res.contrato).format('YYYY[-]MM[-]DD');
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

    }, [embarcacion, snapEmb])

    let handleChangeEmb = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;

        let newEmb = {...embarcacion, [name] : value}
        setEmbarcacion(newEmb);
    }

    let guardarCambios = () => {
        let campos = []
            llaves.forEach((llave)=> {
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
                //Iguala el snap al state actual para no tener que consultar a la base de nuevo
                setSnapEmb(embarcacion);
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
            {embarcacion ? llaves.map((llave)=>{
                let soloLectura = llave === 'Id';
                let showLabel = llave !== 'nombre';
                let tipo = llave === 'contrato' || llave === 'seguro' || llave === 'baja' ? 'date' : 'text';
                return(
                    <CampoEditable
                        showLabel={showLabel}
                        label={llave}
                        soloLectura={soloLectura}
                        tipo={tipo}
                        entidad="embarcacion"
                        handler={handleChangeEmb}
                        llave={llave}
                        valor={embarcacion[llave]}
                    />
                )
            }) : '...'}
            
            <Propietarios propietario={propietario} />
            
            <div className={`embarcacion__flag ${modificado ? 'embarcacion__flag--visible' : ''}`}>
            {modificado ?
                <FlagModificado
                    guardar={guardarCambios}
                    descartar={descartarCambios}
                    clasesLabel="embarcacion__flag__label"
                    clasesBoton="embarcacion__flag__boton simple-hover"  
                />
            :''
            }
            </div>
        </div>
    )
};

