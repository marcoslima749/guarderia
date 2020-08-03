import React from 'react';
import { CampoEditable } from '../../embarcaciones/components/CampoEditable';
import { useState } from 'react';
import { useEffect } from 'react';

import './FormaFacturacion.css';


export const FormaFacturacion = ({datos = [], handler = ()=>{}, clienteID, handleNuevaForma, handleEliminarForma}) => {

    let [formas, setFormas] = useState([...datos]);

    
    useEffect(()=>{
         setFormas(datos);
     },[datos])

    let formaNueva =  {
        "idforma_de_facturacion": Math.random(),
        "numero_cliente": "",
        "razon_social": "",
        "documento": "",
        "iva": "",
        "tipo_de_factura": "",
        "clientes_idclientes": clienteID
     }

    return(
        <div className="cliente__forma-facturacion">
            <div className="forma-facturacion__main-label">forma de facturacion: </div>

                <div className="forma-facturacion__entradas">

                    <span>Numero Cliente:</span>
                    <span>Razon Social:</span>
                    <span>Documento:</span>
                    <span>Iva:</span>
                    <span>Tipo De Factura:</span>
                    <span></span>
                    {
                        formas ?
                            formas.map((forma)=> {
                                let llavesFormaFacturacion = Object.keys(forma);
                                let id = forma.idforma_de_facturacion;
                                return(
                                    [...llavesFormaFacturacion.filter( l => l !== 'idforma_de_facturacion' && l !== 'clientes_idclientes').map((llave)=> {
                                    let tipo = 'text';
                                    let label = llave.replace(/_/g, ' ') ;
                                    return(

                                        <CampoEditable
                                        key={id + '-' + llave}
                                        placeHolder={label}
                                        id={id}
                                        showLabel={false}
                                        label={label}
                                        soloLectura={false}
                                        tipo={tipo}
                                        entidad="cliente"
                                        handler={handler}
                                        llave={llave}
                                        valor={forma[llave]}
                                        />
                                        
                                    )
                                    }), <span key={id + '-Eliminar'} onClick={()=>handleEliminarForma(id)} className="forma-facturacion__boton-cerrar simple-hover">&times;</span>]
                                )
                                
                                }
                            )

                        
                        : '...'
                    }
                </div>
            <button onClick={()=>handleNuevaForma(formaNueva)} className={`forma-de-facturacion__boton-nuevo simple-hover`}>Nuevo</button>
        </div>
    )
};