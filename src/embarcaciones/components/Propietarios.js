import React from 'react';
import { Boton } from '../../shared/components/Boton';

export const Propietarios = ({propietario}) =>{
return (
    <div className="embarcacion__propietarios">
                <span className="embarcacion__propietarios__label">
                    Propietarios: 
                </span>
                {propietario ? propietario.map((prop)=> {
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
                })
                :
                <>
                <div className="embarcacion__propietario__campo"></div>
                <div className="embarcacion__propietario__campo"></div>
                <div className="embarcacion__propietario__campo"></div>
                </>
                }
            </div>
)
};