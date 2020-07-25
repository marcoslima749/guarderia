import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useRouterMatch, useParams } from 'react-router-dom';

import './Clientes.css';
import { CampoEditable } from '../../embarcaciones/components/CampoEditable';
import { CampoMultiple } from '../components/CampoMultiple';
import { ListaEmbarcaciones } from '../../shared/components/ListaEmbarcaciones';
import { FormaFacturacion } from '../components/FormaFacturacion';
import { verificarCambios } from '../../shared/util/verificarCambios';
import { FlagModificado } from '../../embarcaciones/components/FlagModificado';
import { objetosNoIncluidos } from '../../shared/util/objetosNoIncluidos';

const moment = require('moment');

export const Cliente = () => {
    let [cliente, setCliente] = useState({});
    let [snapCliente, setSnapCliente] = useState({});
    let [llavesCliente, setLlavesCliente] = useState([]);
    let [mails, setMails] = useState([]);
    let [snapMails, setSnapMails] = useState([]);
    let [telefonos, setTelefonos] = useState([]);
    let [snapTelefonos, setSnapTelefonos] = useState([]);
    let [formaPago, setFormaPago] = useState([]);
    let [snapFormaPago, setSnapFormaPago] = useState([]);
    let [formaFacturacion, setFormaFacturacion] = useState([]);
    let [snapFormaFacturacion, setSnapFormaFacturacion] = useState([]);
    let [listaEmb, setListaEmb] = useState([]);
    let [modificado, setModificado] = useState(false);

    let params = useParams();
 
    useEffect(() =>{
        console.log('render')
        axios.get(`/api/db/clientes/${params.id}`).then((response)=>{
            let res = response.data[0];
            res.fecha_registro = moment(res.fecha_registro).format('YYYY[-]MM[-]DD');
            res.fecha_ingreso = moment(res.fecha_ingreso).format('YYYY[-]MM[-]DD');
            setCliente(JSON.parse(JSON.stringify(response.data[0])));
            setSnapCliente(JSON.parse(JSON.stringify(response.data[0])));
            setLlavesCliente(Object.keys(response.data[0]));
        });
        
        axios.get(`/api/db/clientes/${params.id}/m`).then((response)=>{
            setMails(JSON.parse(JSON.stringify(response.data)));
            setSnapMails(JSON.parse(JSON.stringify(response.data)));
        });
        
        axios.get(`/api/db/clientes/${params.id}/t`).then((response)=>{
            setTelefonos(JSON.parse(JSON.stringify(response.data)));
            setSnapTelefonos(JSON.parse(JSON.stringify(response.data)));
        });
        
        axios.get(`/api/db/clientes/${params.id}/f`).then((response)=>{
            setFormaFacturacion(JSON.parse(JSON.stringify(response.data)));
            setSnapFormaFacturacion(JSON.parse(JSON.stringify(response.data)));

        });
        
        axios.get(`/api/db/clientes/${params.id}/p`).then((response)=>{
            setFormaPago(JSON.parse(JSON.stringify(response.data)));
            setSnapFormaPago(JSON.parse(JSON.stringify(response.data)));
        });
        
        axios.get(`/api/db/clientes/${params.id}/emb`).then((response)=>{
            setListaEmb(JSON.parse(JSON.stringify(response.data)));
        });

    }, [params.id]);



    useEffect(()=>{
        let arrCambio = [];
        arrCambio.push(verificarCambios(cliente, snapCliente));
        arrCambio.push(verificarCambios(mails, snapMails));
        arrCambio.push(verificarCambios(telefonos, snapTelefonos));
        arrCambio.push(verificarCambios(formaPago, snapFormaPago));
        arrCambio.push(verificarCambios(formaFacturacion, snapFormaFacturacion));
        let cambio = arrCambio.some((b)=>b);

        setModificado(cambio);

    }, [cliente, mails, telefonos, formaFacturacion, formaPago, snapCliente, snapMails, snapTelefonos, snapFormaFacturacion, snapFormaPago]);
    

    let guardarCambios = () => {
        //verificar los campos modificados en cada tabla
        let cambios = {
            cliente : { idclientes: cliente.idclientes },
            mails : {eliminados: [], nuevos: []},
            telefonos : {eliminados: [], nuevos: []},
            formaPago : {eliminados: [], nuevos: []},
            formaFacturacion : []
        };


        
        //cliente --> snap
        
        for(let llave in cliente) {
            if(cliente[llave] !== snapCliente[llave]) {
                cambios.cliente[llave] = cliente[llave];
            }
        }

        //forma de facturacion es un array que contiene objetos con varias propiedades
        //hay que verificar también qué campo cambió en qué objeto

        //forma de facturacion
        
        cambios.formaFacturacion = formaFacturacion.map((forma, ind)=>{
            let formaMod = {idforma_de_facturacion : forma.idforma_de_facturacion}
            
            for(let llave in forma) {
                if(llave === 'idforma_de_facturacion'){
                    continue;
                }
                if(forma[llave] !== snapFormaFacturacion[ind]?.[llave]) {
                    formaMod[llave] = forma[llave]
                }
            }
            return formaMod
        })

        
        //mails que no están en el snap = mails nuevos
        cambios.mails.nuevos = objetosNoIncluidos(mails, snapMails);
        //mails en snap que no están en los mails actuales = mails eliminados 
        cambios.mails.eliminados = objetosNoIncluidos(snapMails, mails);
        
        //telefonos
        cambios.telefonos.nuevos = objetosNoIncluidos(telefonos, snapTelefonos);
        cambios.telefonos.eliminados = objetosNoIncluidos(snapTelefonos, telefonos);
        
        //formas de pago
        cambios.formaPago.nuevos = objetosNoIncluidos(formaPago, snapFormaPago);
        cambios.formaPago.eliminados = objetosNoIncluidos(snapFormaPago, formaPago);

        //limpiando tablas sin cambios (ver una forma de no agregar estos datos cuando no hay cambios)
        Object.keys(cambios.cliente).length === 1 && delete cambios.cliente;
        cambios.mails.nuevos.length === 0 && cambios.mails.eliminados.length === 0 && delete cambios.mails;
        cambios.telefonos.nuevos.length === 0 && cambios.telefonos.eliminados.length === 0 && delete cambios.telefonos;
        cambios.formaPago.nuevos.length === 0 && cambios.formaPago.eliminados.length === 0 && delete cambios.formaPago;
        cambios.formaFacturacion.forEach((forma, ind)=>{
            if (Object.keys(forma).length === 1) {
                cambios.formaFacturacion.splice(ind,1);
            }
        });
        cambios.formaFacturacion.length === 0 && delete cambios.formaFacturacion;
 
        console.log('cambios: ', cambios);

    }

    let descartarCambios = () => {

        setCliente(JSON.parse(JSON.stringify(snapCliente)));
        setMails(JSON.parse(JSON.stringify(snapMails)));
        setTelefonos(JSON.parse(JSON.stringify(snapTelefonos)));
        setFormaPago(JSON.parse(JSON.stringify(snapFormaPago)));
        setFormaFacturacion(JSON.parse(JSON.stringify(snapFormaFacturacion)));

    }

    let handleNuevaForma = (nuevaForma) => {
        setFormaFacturacion((prevForma)=>{
            console.log('click')
            return [...prevForma, nuevaForma]
        })
    }

    let handleChangeFormaFacturacion = (e, id) => {
        let name = e.target.name;
        let value = e.target.value;
        setFormaFacturacion((prevForma)=>{

            let resto = prevForma.filter((forma)=>{
                return forma.idforma_de_facturacion !== id
            });

            let targetForma = prevForma.filter((forma)=>{
                return forma.idforma_de_facturacion === id
            })[0];

            targetForma[name] = value;

            let newForma = [...resto, targetForma];

            return(newForma);

        })
    }

    let handleEliminarForma = (id) => {
        setFormaFacturacion((prevForma)=>{

            let resto = prevForma.filter((forma)=>{
                return forma.idforma_de_facturacion !== id
            });
            return resto;
        })

    }

    let handleChangeCliente = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setCliente((prevCliente) => {
            let newCliente = {...prevCliente}
            newCliente[name] = value;
            return (newCliente);
        })
    }

    let handleChangeMails = (obj) => {
        setMails((prevMails)=>{
            let newMails = [...prevMails, obj];
            return(newMails);
        })
    }

    let handleEliminarMail = (ind) => {
        setMails((prevMails)=>{
            let newMails = prevMails.filter((_e, i) =>{
                return i !== ind;
            })
            return(newMails);
        })
    }
    
    let handleChangeTelefonos = (obj) => {
        setTelefonos((prevTelefonos)=>{
            let newTelefonos = [...prevTelefonos, obj];
            return(newTelefonos);
        })
    }

    let handleEliminarTelefono = (ind) => {
        setTelefonos((prevTelefonos)=>{
            let newTelefonos = prevTelefonos.filter((_e, i) =>{
                return i !== ind;
            })
            return(newTelefonos);
        })
    }
    
    let handleChangeFormaPago = (obj) => {
        setFormaPago((prevFormaPago)=>{
            let newFormaPago = [...prevFormaPago, obj];
            return(newFormaPago);
        })
    }

    let handleEliminarFormaPago = (ind) => {
        setFormaPago((prevFormaPago)=>{
            let newFormaPago = prevFormaPago.filter((_e, i) =>{
                return i !== ind;
            })
            return(newFormaPago);
        })
    }
    
    return(
        <div className="clientes__container">
            <div className="cliente__datos-cliente">
                {
                    cliente ?

                    llavesCliente.map((llave)=> {
                        let tipo = llave ==='fecha_registro' || llave === 'fecha_ingreso' ? 'date' : 'text';
                        let label = llave === 'idclientes' ? 'ID' : llave.replace(/_/g, ' ');
                        let soloLectura = llave === 'idclientes';
                        return(
                            <CampoEditable
                            showLabel={true}
                            label={label}
                            soloLectura={soloLectura}
                            tipo={tipo}
                            entidad="cliente"
                            handler={handleChangeCliente}
                            llave={llave}
                            valor={cliente[llave]}
                            />
                        )
                    })
                    
                    : '...'
                }
            </div>

            <div className="cliente__datos-contacto">

                <div className="cliente__mails">
                    <span>mails: </span>
                        {
                            mails ? 
                                
                                    <CampoMultiple
                                        showLabel={false}
                                        soloLectura={false}
                                        tipo={'mail'}
                                        entidad="cliente"
                                        handler={handleChangeMails}
                                        handleEliminar={handleEliminarMail}
                                        llave={'mail'}
                                        datos={mails}
                                        objKey={'mail'}
                                    />
                                
                        
                        
                        : '...'
                        }
                </div>

                <div className="cliente__telefonos">
                    <span>telefonos: </span>
                    {
                        telefonos ? 
                            
                                <CampoMultiple
                                    showLabel={false}
                                    soloLectura={false}
                                    tipo={'text'}
                                    entidad="cliente"
                                    handler={handleChangeTelefonos}
                                    handleEliminar={handleEliminarTelefono}
                                    llave={'telefono'}
                                    datos={telefonos}
                                    objKey='telefono'
                                />
                            
                    : '...' 
                    }
                </div>
            
            </div>

            <div className="cliente__forma-pago">
                <span>forma de pago: </span>
                {
                    formaPago ? 
                    
                            <CampoMultiple
                                showLabel={false}
                                soloLectura={false}
                                tipo={'text'}
                                entidad="cliente"
                                handler={handleChangeFormaPago}
                                handleEliminar={handleEliminarFormaPago}
                                llave={'forma-de-pago'}
                                datos={formaPago}
                                objKey='descripcion'
                            />
                    
                     : '...' 
                }
            </div>

            {
                formaFacturacion ? 

                <FormaFacturacion

                datos={formaFacturacion}
                handler={handleChangeFormaFacturacion}
                handleNuevaForma={handleNuevaForma}
                handleEliminarForma={handleEliminarForma}
                clienteID={params.id}

                />

                :
                ''
            }

            {
                listaEmb ?

                    <ListaEmbarcaciones
                        entidad='clientes'
                        llave='embarcacion'
                        url='embarcaciones'
                        embarcaciones={listaEmb}
                    />

                :

                '' 
            }

            <div className={`cliente__flag ${modificado ? 'cliente__flag--visible' : ''}`}>
            {modificado ?
                <FlagModificado
                    guardar={guardarCambios}
                    descartar={descartarCambios}
                    clasesLabel="cliente__flag__label"
                    clasesBoton="cliente__flag__boton simple-hover"  
                />
            :''
            }
            </div>

            {/* <pre>
                {JSON.stringify(cliente, null, 3)}
                {JSON.stringify(mails,null,3)}
                {JSON.stringify(telefonos,null,3)}
                {JSON.stringify(formaPago,null,3)}
                {JSON.stringify(formaFacturacion,null,3)}
            </pre> */}
        </div>
    )
};