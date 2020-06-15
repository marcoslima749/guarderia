import React, { useState , useEffect } from 'react';

import './Tareas.css'

import mas from '../../shared/components/iconos/mas.svg';
import listo from '../../shared/components/iconos/listo.svg';

let listaDeTareas = [
    {
        id: 1,
        descripcion: "Es necesario realizar la Tarea Uno",
        nota: "Hay que verificar tal cosa",
        deadline: "2020-10-07",
        prioridad: 1,
        completado: false
    },
    {
        id: 2,
        descripcion: "Es necesario realizar la Tarea Dos",
        nota: "Hay que verificar tal otra cosa",
        deadline: "2020-11-30",
        prioridad: 3,
        completado: false
    },
    {
        id: 3,
        descripcion: "Es necesario realizar la Tarea Tres",
        nota: "Hay que verificar tal otra cosa",
        deadline: "",
        prioridad: 2,
        completado: false
    }
];


export const Tareas = () => {

    let [ lista, setLista ] = useState();
    let [completadas, setCompletadas] = useState(0);
    let [desplazar, setDesplazar] = useState(false);
    let [transition, setTransition] = useState(true);
    

    useEffect(()=> {
        setLista(() => {
            return listaDeTareas
        });

    setCompletadas((prevCompletadas)=> {
        let newCompletadas = prevCompletadas;
        listaDeTareas.forEach((tarea)=> tarea.completado && ++newCompletadas);
        return newCompletadas;
    });

    }, [])
    
    const completarTarea = (id) => {
        let newLista = lista.map((tarea) => {
            if(tarea.id === id) {
                tarea.completado = true;
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
                    id: id,
                    descripcion: "",
                    nota: "",
                    deadline: "",
                    prioridad: "",
                    completado: false
                }
            );
            return newLista
        })
    }

    const handleChange = (e, id) => {
        let prevLista = JSON.parse(JSON.stringify(lista));
        let newLista = prevLista.map((tarea)=>{
            if(tarea.id === id) {
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
            
            {lista && lista.filter((tarea)=>tarea.completado === false).map((tarea)=> {
                return(
                    <li key={tarea.id} className={`lista-tareas__tarea simple-hover ${transition && 'lista-tareas__tarea--transition'} ${ desplazar&& 'lista-tareas__desplazar'}`}>
                        <div className="lista-tareas__completado" onClick={()=>completarTarea(tarea.id)} >
                            <img src={listo} alt="Tilde"/>
                        </div>
                        <div className="lista-tareas__info">
                        <div className="lista-tareas__campo-descripcion">
                            <input type="text" onChange={(e)=>handleChange(e, tarea.id)} name="descripcion" spellCheck="false" className="lista-tareas__descripcion lista-tareas__campo" value={tarea.descripcion} />
                        </div>
                        <div className="lista-tareas__campo-nota">
                            <input type="text" onChange={(e)=>handleChange(e, tarea.id)} name="nota" spellCheck="false" className="lista-tareas__nota lista-tareas__campo" value={tarea.nota} />
                        </div>    
                        </div>
                        <input type="date" name="deadline" onChange={(e)=>handleChange(e, tarea.id)} className="lista-tareas__deadline lista-tareas__campo" value={tarea.deadline ? tarea.deadline : "2020-06-15" } />
                        <div className="lista-tareas__campo-prioridad">
                        <input type="text" onChange={(e)=>handleChange(e, tarea.id)} name="prioridad" spellCheck="false" className="lista-tareas__prioridad lista-tareas__campo" value={tarea.prioridad} />
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