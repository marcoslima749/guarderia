import React from 'react';
import { Boton } from './Boton';

export const ListaEmbarcaciones = ({entidad, llave, url, embarcaciones}) =>{
return (
    <div className={`${entidad}__${llave}__embarcaciones`}>
                <span className={`${entidad}__${llave}__label`}>
                    {llave}: 
                </span>
                {embarcaciones ? embarcaciones.map((emb)=> {
                    return(
                        <div className={`${entidad}__${llave}__campo`}>
                        <Boton path={`/${url}/${emb.id}`}  clases={`${entidad}__${llave}__nombre__boton simple-hover`} >{emb.nombre}</Boton>
                        </div>
                    )
                })
                :
                <div className={`${entidad}__${llave}__campo`}></div>
                }
    </div>
)
};