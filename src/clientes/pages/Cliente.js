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
import { objetosNoIncluidosID } from '../../shared/util/objetosNoIncluidosID';
import { useRef } from 'react';
import { DetalleFormaPago } from '../components/DetalleFormaPago';

const moment = require('moment');

export const Cliente = ({setHeader}) => {
    let [cliente, setCliente] = useState({});
    let [snapCliente, setSnapCliente] = useState({});
    let [llavesCliente, setLlavesCliente] = useState([]);
    let [mails, setMails] = useState([]);
    let [snapMails, setSnapMails] = useState([]);
    let [telefonos, setTelefonos] = useState([]);
    let [snapTelefonos, setSnapTelefonos] = useState([]);
    let [formaPago, setFormaPago] = useState([]);
    let [snapFormaPago, setSnapFormaPago] = useState([]);
    let listaFormasDePago = useRef();
    let [observaciones, setObservaciones] = useState([]);
    let [snapObservaciones, setSnapObservaciones] = useState([]);
    let [formaFacturacion, setFormaFacturacion] = useState([]);
    let [snapFormaFacturacion, setSnapFormaFacturacion] = useState([]);
    let [listaEmb, setListaEmb] = useState([]);
    let [modificado, setModificado] = useState(false);
    let [detalleFormaPago, setDetalleFormaPago] = useState(null);

    let params = useParams();

    useEffect(()=>{
        setHeader.setNombreHeader("CYNM");
        setHeader.setDescripcionHeader("Clientes");
        setHeader.setPanelHeader(null);
    },[]);

 
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
        
        axios.get(`/api/db/clientes/${params.id}/mails`).then((response)=>{
            setMails(JSON.parse(JSON.stringify(response.data)));
            setSnapMails(JSON.parse(JSON.stringify(response.data)));
        });
        
        axios.get(`/api/db/clientes/${params.id}/telefonos`).then((response)=>{
            setTelefonos(JSON.parse(JSON.stringify(response.data)));
            setSnapTelefonos(JSON.parse(JSON.stringify(response.data)));
        });
        
        axios.get(`/api/db/clientes/${params.id}/forma-de-facturacion`).then((response)=>{
            setFormaFacturacion(JSON.parse(JSON.stringify(response.data)));
            setSnapFormaFacturacion(JSON.parse(JSON.stringify(response.data)));

        });
        
        axios.get(`/api/db/clientes/${params.id}/forma-de-pago`).then((response)=>{
            setFormaPago(JSON.parse(JSON.stringify(response.data)));
            setSnapFormaPago(JSON.parse(JSON.stringify(response.data)));
        });

        axios.get(`/api/db/clientes/${params.id}/observaciones`).then((response)=>{
            setObservaciones(JSON.parse(JSON.stringify(response.data)));
            setSnapObservaciones(JSON.parse(JSON.stringify(response.data)));
        })
        
        axios.get(`/api/db/clientes/${params.id}/embarcaciones`).then((response)=>{
            setListaEmb(JSON.parse(JSON.stringify(response.data)));
        });

        axios.get('/api/db/formas-de-pago').then((response)=>{
            listaFormasDePago.current = response.data;
        })

    }, [params.id]);



    useEffect(()=>{
        let arrCambio = [];
        arrCambio.push(verificarCambios(cliente, snapCliente));
        arrCambio.push(verificarCambios(mails, snapMails));
        arrCambio.push(verificarCambios(telefonos, snapTelefonos));
        arrCambio.push(verificarCambios(formaPago, snapFormaPago));
        arrCambio.push(verificarCambios(formaFacturacion, snapFormaFacturacion));
        arrCambio.push(verificarCambios(observaciones, snapObservaciones));
        let cambio = arrCambio.some((b)=>b);

        setModificado(cambio);

    }, [cliente, mails, telefonos, formaFacturacion, formaPago, observaciones, snapCliente, snapMails, snapTelefonos, snapFormaFacturacion, snapFormaPago, snapObservaciones]);

    let handleDescartarDetalleFP = () =>{
        setDetalleFormaPago(null);
    } 

    let handleGuardarDetalleFP = (formaGuardada) => {
        if(formaGuardada.numero === ""){
            formaGuardada.numero = null;
        }

        setFormaPago((prevFormaPago)=> {
            let newFormaPago = prevFormaPago.map((forma)=>{
                if(forma.idforma_de_pago_has_clientes === formaGuardada.idforma_de_pago_has_clientes){
                    return formaGuardada
                } else {
                    return forma
                };
            });

            return(newFormaPago);
        });

        setDetalleFormaPago(null);
    }

    

    let guardarCambios = () => {
        //verificar los campos modificados en cada tabla
        let cambios = {
            clientes : { idclientes: cliente.idclientes },
            mails : {eliminar: [], insertar: []},
            telefonos : {eliminar: [], insertar: []},
            observaciones : {eliminar: [], insertar: []},
            forma_de_pago : {eliminar: [], insertar: []},
            forma_de_facturacion : {eliminar: [], insertar: [], modificar:[]}
        };


        
        //cliente --> snap
        
        for(let llave in cliente) {
            if(cliente[llave] !== snapCliente[llave]) {
                cambios.clientes[llave] = cliente[llave];
            }
        }

        //forma de facturacion es un array que contiene objetos con varias propiedades
        //hay que verificar también qué campo cambió en qué objeto

        //forma de facturacion

        cambios.forma_de_facturacion.insertar = formaFacturacion.filter((forma)=> {
            return forma.idforma_de_facturacion < 1;
        });


        let ffModificarEliminar = formaFacturacion.filter((forma)=> {
            return forma.idforma_de_facturacion >= 1;
        });
        
        //comparar solo el ID
        cambios.forma_de_facturacion.eliminar = objetosNoIncluidosID(snapFormaFacturacion, ffModificarEliminar, 'idforma_de_facturacion')
        
        console.log('eliminar ', cambios.forma_de_facturacion.eliminar);
        
        let ffModificar = ffModificarEliminar.filter((ff)=>{
            let modificar = true;
            cambios.forma_de_facturacion.eliminar.forEach((elim)=>{
                if (elim.idforma_de_facturacion === ff.idforma_de_facturacion){
                    modificar = false;
                }
            });
            return modificar;
        });
        

        cambios.forma_de_facturacion.modificar = ffModificar.map((forma, ind)=>{
            
            if(forma.idforma_de_facturacion < 1) {
                return forma;
            }

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

        
        
        //formas de pago
        cambios.forma_de_pago.insertar = objetosNoIncluidos(formaPago, snapFormaPago);
        cambios.forma_de_pago.eliminar = objetosNoIncluidos(snapFormaPago, formaPago);
        
        //mails que no están en el snap = mails nuevos
        cambios.mails.insertar = objetosNoIncluidos(mails, snapMails);
        //mails en snap que no están en los mails actuales = mails eliminados 
        cambios.mails.eliminar = objetosNoIncluidos(snapMails, mails);
        
        //telefonos
        cambios.telefonos.insertar = objetosNoIncluidos(telefonos, snapTelefonos);
        cambios.telefonos.eliminar = objetosNoIncluidos(snapTelefonos, telefonos);
        
        //observaciones
        cambios.observaciones.insertar = objetosNoIncluidos(observaciones, snapObservaciones);
        cambios.observaciones.eliminar = objetosNoIncluidos(snapObservaciones, observaciones);
        


        //limpiando tablas sin cambios (hay que ver una forma de no agregar estos datos cuando no hay cambios)
        Object.keys(cambios.clientes).length === 1 && delete cambios.clientes;
        cambios.mails.insertar.length === 0 && delete cambios.mails.insertar;
        cambios.mails.eliminar.length === 0 && delete cambios.mails.eliminar;
        Object.keys(cambios.mails).length === 0 && delete cambios.mails;
        cambios.telefonos.insertar.length === 0 && delete cambios.telefonos.insertar;
        cambios.telefonos.eliminar.length === 0 && delete cambios.telefonos.eliminar;
        Object.keys(cambios.telefonos).length === 0 && delete cambios.telefonos;
        cambios.forma_de_pago.insertar.length === 0 && delete cambios.forma_de_pago.insertar;
        cambios.forma_de_pago.eliminar.length === 0 && delete cambios.forma_de_pago.eliminar;
        Object.keys(cambios.forma_de_pago).length === 0 && delete cambios.forma_de_pago;
        cambios.observaciones.insertar.length === 0 && delete cambios.observaciones.insertar;
        cambios.observaciones.eliminar.length === 0 && delete cambios.observaciones.eliminar;
        Object.keys(cambios.observaciones).length === 0 && delete cambios.observaciones;
        
        cambios.forma_de_facturacion.modificar.forEach((forma, ind)=>{
            if (Object.keys(forma).length === 1) {
                cambios.forma_de_facturacion.modificar.splice(ind,1);
            }
        });
        cambios.forma_de_facturacion.insertar.forEach((forma, ind)=>{
            if (Object.keys(forma).length === 1) {
                cambios.forma_de_facturacion.insertar.splice(ind,1);
            }
        });
        cambios.forma_de_facturacion.eliminar.forEach((forma, ind)=>{
            if (Object.keys(forma).length === 1) {
                cambios.forma_de_facturacion.eliminar.splice(ind,1);
            }
        });

        cambios.forma_de_facturacion.eliminar.length === 0 && delete cambios.forma_de_facturacion.eliminar;
        cambios.forma_de_facturacion.insertar.length === 0 && delete cambios.forma_de_facturacion.insertar;
        cambios.forma_de_facturacion.modificar.length === 0 && delete cambios.forma_de_facturacion.modificar;
        Object.keys(cambios.forma_de_facturacion).length === 0 && delete cambios.forma_de_facturacion;

        axios.put(`/api/db/clientes/${params.id}/guardar-cambios`, cambios).then((response)=>{
            console.log('response: ', response);
            aplicarCambios();
        }).catch((error)=>{
            throw error;
        })
        
        console.log('cambios: ', cambios);

        

    }

    let aplicarCambios = () => {
        setSnapCliente(JSON.parse(JSON.stringify(cliente)));
        setSnapMails(JSON.parse(JSON.stringify(mails)));
        setSnapTelefonos(JSON.parse(JSON.stringify(telefonos)));
        setSnapFormaPago(JSON.parse(JSON.stringify(formaPago)));
        setSnapFormaFacturacion(JSON.parse(JSON.stringify(formaFacturacion)));
        setSnapObservaciones(JSON.parse(JSON.stringify(observaciones)));

    }

    let descartarCambios = () => {

        setCliente(JSON.parse(JSON.stringify(snapCliente)));
        setMails(JSON.parse(JSON.stringify(snapMails)));
        setTelefonos(JSON.parse(JSON.stringify(snapTelefonos)));
        setFormaPago(JSON.parse(JSON.stringify(snapFormaPago)));
        setFormaFacturacion(JSON.parse(JSON.stringify(snapFormaFacturacion)));
        setObservaciones(JSON.parse(JSON.stringify(snapObservaciones)));

    }

    let handleNuevaForma = (nuevaForma) => {
        setFormaFacturacion((prevForma)=>{
            return [...prevForma, nuevaForma]
        })
    }

    let handleChangeFormaFacturacion = (e, id) => {
        let name = e.target.name;
        let value = e.target.value;
        setFormaFacturacion((prevForma)=>{

            let newForma = prevForma.map((forma)=>{
                if(forma.idforma_de_facturacion === id){
                    forma[name] = value;
                }
                return forma;
            });

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
        let objCompleto = {...obj, idforma_de_pago_has_clientes : Math.random(), numero : null, clientes_idclientes : Number(params.id)}
        setFormaPago((prevFormaPago)=>{
            let newFormaPago = [...prevFormaPago, objCompleto];
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

    let validarFormaPago = (valor, callback) => {
        let forma = listaFormasDePago.current.filter((forma)=> forma.descripcion === valor);
        if(forma.length > 0 ) {
            callback({descripcion : valor, forma_de_pago_idforma_de_pago: forma[0].idforma_de_pago})
        }
    }

    let hancleChangeObservaciones = (obj) => {
        setObservaciones((prevObservaciones)=>{
            let newObservaciones = [...prevObservaciones, obj];
            return(newObservaciones);
        })
    }

    let handleEliminarObservaciones = (ind) => {
        setObservaciones((prevObservaciones)=>{
            let newObservaciones = prevObservaciones.filter((_e, i) =>{
                return i !== ind;
            })
            return(newObservaciones);
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
                            key={llave}
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
                                
                </div>

                <div className="cliente__telefonos">
                    <span>telefonos: </span>

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
                            
                </div>
            
            </div>

            <div className="cliente__forma-pago">
                <span>forma de pago: </span>
                {
                    detalleFormaPago ?

                <DetalleFormaPago
                    detalle={detalleFormaPago}
                    handleGuardar={handleGuardarDetalleFP}
                    handleDescartar={handleDescartarDetalleFP}
                />
                    :

                <CampoMultiple
                    chipsHandleClick={setDetalleFormaPago}
                    chipsClases='simple-hover'
                    validacion={validarFormaPago}
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

                }

                    
            </div>

            <div className="cliente__observaciones">
                <span>Observaciones: </span>

                <CampoMultiple
                    showLabel={false}
                    soloLectura={false}
                    tipo={'text'}
                    entidad='cliente'
                    handler={hancleChangeObservaciones}
                    handleEliminar={handleEliminarObservaciones}
                    llave='observacion'
                    datos={observaciones}
                    objKey='observacion'
                    />

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