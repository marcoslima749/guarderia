import React from 'react';

import './Tareas.css'

let listaDeTareas = [
    {
        id: 1,
        descripcion: "Es necesario realizar la Tarea Uno",
        nota: "Hay que verificar tal cosa",
        deadline: "12/06/2020",
        prioridad: 1,
        completado: true
    },
    {
        id: 2,
        descripcion: "Es necesario realizar la Tarea Dos",
        nota: "Hay que verificar tal otra cosa",
        deadline: "12/06/2020",
        prioridad: 3,
        completado: false
    },
    {
        id: 3,
        descripcion: "Es necesario realizar la Tarea Tres",
        nota: "Hay que verificar tal otra cosa",
        deadline: "12/06/2020",
        prioridad: 2,
        completado: false
    }
];

export const Tareas = () => {

    return(
        <ul className="lista-tareas">
            {listaDeTareas.map((tarea)=> {
                return(
                    <li className="lista-tareas__tarea">
                        
                            <span className="lista-tareas__descripcion">{tarea.descripcion}</span>
                            <span className="lista-tareas__nota">{tarea.nota}</span>
                            <span className="lista-tareas__deadline">{tarea.deadline}</span>
                            <span className="lista-tareas__prioridad">{tarea.prioridad}</span>
                            <span className="lista-tareas__completado">{tarea.completado}</span>
                        
                    </li>
                )
            })}
        </ul>
    )
};