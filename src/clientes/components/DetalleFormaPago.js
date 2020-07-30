import React, { useState } from 'react';
import { Entrada } from '../../shared/components/Entrada';
import './DetalleFormaPago.css';

export const DetalleFormaPago = ({clases = '', detalle, handleGuardar = ()=>{}, handleDescartar = ()=>{}}) => {
    let [detalleState, setDetalleState] = useState(detalle);

    let handleChangeDetalle = ({target}) => {
        setDetalleState((prevDetalle)=> {
            let newState = {...prevDetalle, [target?.name] : target?.value}
            return newState;
        });
    }


    return(
        <div className={`forma-de-pago__detalle__container ${clases}`}>
            <div class="forma-de-pago__detalle__inputs">
                <Entrada handleChange={handleChangeDetalle} name='descripcion' clases='forma-de-pago__detalle__descripcion' value={detalleState.descripcion} placeHolder='Descripción' />
                <Entrada handleChange={handleChangeDetalle} name='numero' clases='forma-de-pago__detalle__numero' value={detalleState.numero} placeHolder='Número' />
            </div>
            <div className='forma-de-pago__detalle__botones'>
                <button onClick={()=>handleGuardar(detalleState)} className='forma-de-pago__detalle__boton forma-de-pago__detalle__boton__guardar simple-hover'>Guardar</button>
                <button onClick={handleDescartar} className='forma-de-pago__detalle__boton forma-de-pago__detalle__boton__descartar simple-hover'>Descartar</button>
            </div>
        </div>
    )
}