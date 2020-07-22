import React from 'react';
import { useState } from 'react';
import { Entrada } from '../../shared/components/Entrada';
import { Chip } from './Chip';
import './CampoMultiple.css';
import { useEffect } from 'react';

export const CampoMultiple = ({datos, entidad, llave, handler, handleEliminar, objKey, label = '', tipo = 'text', soloLectura = false, showLabel = false}) => {
    let [listaChips, setListaChips] = useState([]);
    let [valorInput, setValorInput] = useState('');
    
    useEffect(()=>{
        setListaChips(datos);
    }, [datos])
  
    let handleChange = (e) => {
        let valor = e.target.value;
        setValorInput(valor);
    }
    
    let handleEnter = (e) => {


        if (e.key !== 'Enter' || e.target.value === '') {
            return;
        }

        let valor = e.target.value;

        //reemplazar con
        handler({[objKey]: valor});

        // setListaChips((prevChips)=> {
        //     let newChips = [...prevChips, {[objKey]: valor}];
        //     console.log(newChips);
        //     return(newChips);
        // });

        setValorInput('');

    }


    return (
        <div className="campo-multiple__container">
            <div className="chips__container">
                {
                    listaChips.length > 0 ? listaChips.map((c, i)=> <Chip value={c[objKey]} ind={i} handleEliminar={handleEliminar} />) : <div style={{height: '40px', margin: '1px'}}></div>
                }
            </div>
            <Entrada
                placeHolder={`${llave === 'forma-de-pago' ? 'nueva' : 'nuevo'} ${llave.replace(/[_-]/g,' ')}`}
                soloLectura={soloLectura}
                showLabel={showLabel}
                label={label}
                tipo={tipo}
                name={llave}
                value={valorInput}
                handleChange={handleChange}
                handleEnter={handleEnter}
                clases={`${entidad}__${llave}`}
            />
        </div>
    )
};

