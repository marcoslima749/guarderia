import React, { useState , useEffect } from 'react';

import axios from 'axios';

import './Tareas.css'

import mas from '../../shared/components/iconos/mas.svg';
import listo from '../../shared/components/iconos/listo.svg';

const moment = require('moment');

/*
let listaDeTareas = [
    {
        idtareas: 1,
        descripcion: "Es necesario realizar la Tarea Uno",
        nota: "Hay que verificar tal cosa",
        deadline: "2020-10-07",
        prioridad: 1,
        completado: false
    },
    {
        idtareas: 2,
        descripcion: "Es necesario realizar la Tarea Dos",
        nota: "Hay que verificar tal otra cosa",
        deadline: "2020-11-30",
        prioridad: 3,
        completado: false
    },
    {
        idtareas: 3,
        descripcion: "Es necesario realizar la Tarea Tres",
        nota: "Hay que verificar tal otra cosa",
        deadline: "",
        prioridad: 2,
        completado: false
    }
];
*/

export const Tareas = () => {

    
    let [ lista, setLista ] = useState();
    let [completadas, setCompletadas] = useState(0);

    //Estados para manejar el CSS a través de las clases
    let [desplazar, setDesplazar] = useState(false);
    let [transition, setTransition] = useState(true);
    

    useEffect(() => {
            axios.get('/api/db/tareas', {
                params: {
                    prueba : 'este es un parámetro de prueba'
                }
            }).then((res)=>{
                setLista(() => res.data);
            }).catch((err)=> {
                console.log(err);
            });            
    }, [])
    
    //VER POR QUÉ AL LLAMAR A SETCOMPLETADAS LISTA SALE UNDEFINED

    const countCompletadas = () => {
        setCompletadas((prevCompletadas)=> {
            let newCompletadas = prevCompletadas;
            lista.forEach((tarea)=> !!tarea.completado && ++newCompletadas);
            return newCompletadas;
        })
    }
    
    const completarTarea = (id) => {
        let newLista = lista.map((tarea) => {
            if(tarea.idtareas === id) {
                tarea.completado = 1;
            }
            return tarea;
        });
        setLista(newLista);
        setCompletadas((prevCompletadas) => {
            return ++prevCompletadas;
        })
    }

    const handleDesplazar = (e) => {
        //Los eventos en React se nullifican por razones de performance
        //Por lo tanto necesito capturar el elemento antes de que suceda para poder hacer focus
        //Capturo el header y espero a que se actualice el árbol para después navegar hacia el input
        let nodo = e.target.parentElement.parentElement;
        //Como la transición demora hay que esperar 300ms a que finalice y desactivarla,
        //deshacer el traslado, insertar la nueva tarea (queda igual pero se pinta el nuevo elemento) 
        //y luego esperar 5ms a que termine el render para volver a activar la transición, jaja qué difícil es vivir...
        //luego manejamos el focus
        setDesplazar(()=>true);
        setTimeout((e)=>{;
            setTransition(false);
            setDesplazar(false);
            handleNuevaTarea(Math.random());
            setTimeout((e)=>{
                setTransition(true);
                e.nextSibling.childNodes[1].firstChild.firstChild.focus();
                        
            }, 5 , e);
        }, 300 , nodo)
        
    }
    
    const handleNuevaTarea = (id) => {
        
        setLista((prevLista)=>{
            let newLista = JSON.parse(JSON.stringify(prevLista));
            newLista.unshift(
                {
                    idtareas: id,
                    descripcion: "",
                    nota: "",
                    deadline: "",
                    prioridad: "",
                    completado: 0
                }
            );
            return newLista
        })
    }

    const handleChange = (e, id) => {
        let prevLista = JSON.parse(JSON.stringify(lista));
        let newLista = prevLista.map((tarea)=>{
            if(tarea.idtareas === id) {
                tarea[e.target.name] = e.target.value;
            }
            return tarea;
        });
        setLista(newLista);
    }


    return(
        <div className="lista-tareas__container">
        <ul className="lista-tareas">
            <li className="lista-tareas__tarea lista-tareas__header">
                <span className="lista-tareas__realizado">Realizado</span>

                <div onClick={(e)=>handleDesplazar(e)} className="lista-tareas__agregar simple-hover">
                <img className="lista-tareas__mas" src={mas} alt="signo mas"/>
                <span className="lista-tareas__agregar">Agregar una tarea</span>
                </div>

                <span className="lista-tareas__deadline">Fecha límite</span>
                <span className="lista-tareas__prioridad">Prioridad</span>


            </li>
            
            {lista && lista.filter((tarea)=>tarea.completado === 0).map((tarea)=> {
                return(
                    <li key={tarea.idtareas} className={`lista-tareas__tarea simple-hover ${transition && 'lista-tareas__tarea--transition'} ${ desplazar&& 'lista-tareas__desplazar'}`}>
                        <div className="lista-tareas__completado" onClick={()=>completarTarea(tarea.idtareas)} >
                            <img src={listo} alt="Tilde"/>
                        </div>
                        <div className="lista-tareas__info">
                        <div className="lista-tareas__campo-descripcion">
                            <input type="text" onChange={(e)=>handleChange(e, tarea.idtareas)} name="descripcion" spellCheck="false" className="lista-tareas__descripcion lista-tareas__campo" value={tarea.descripcion} />
                        </div>
                        <div className="lista-tareas__campo-nota">
                            <input type="text" onChange={(e)=>handleChange(e, tarea.idtareas)} name="nota" spellCheck="false" className="lista-tareas__nota lista-tareas__campo" value={tarea.nota} />
                        </div>    
                        </div>
                        <input type="date" name="deadline" onChange={(e)=>handleChange(e, tarea.idtareas)} className="lista-tareas__deadline lista-tareas__campo" value={tarea.deadline ? moment(tarea.deadline).format('YYYY[-]MM[-]DD') : moment().format('YYYY[-]MM[-]DD') } />
                        <div className="lista-tareas__campo-prioridad">
                        <input type="text" onChange={(e)=>handleChange(e, tarea.idtareas)} name="prioridad" spellCheck="false" className="lista-tareas__prioridad lista-tareas__campo" value={tarea.prioridad} />
                        </div>    
                    </li>
                )
            })}

        </ul>
        <div className={`tareas-completadas__container simple-hover ${completadas > 0 && 'tareas-completadas__container--visible'}`}>
            <span className="tareas-completadas__span">
                {`Tareas completadas: ${completadas}`}
            </span>
        </div>
        </div>
    )
};