import React, { useState , useEffect } from 'react';

import axios from 'axios';

import './Tareas.css'

import mas from '../../shared/components/iconos/mas.svg';
import listo from '../../shared/components/iconos/listo.svg';
import eliminar from '../../shared/components/iconos/eliminar.svg';

const moment = require('moment');


export const Tareas = () => {

    
    let [ lista, setLista ] = useState();
    let [listaCopia, setListaCopia] = useState();
    let [completadas, setCompletadas] = useState(0);

    //Estados para manejar el CSS a través de las clases
    let [desplazar, setDesplazar] = useState(false);
    let [transition, setTransition] = useState(true);

    //Estado para manejar el blur y el focus dentro del mismo elemento
    let [elementoAnterior, setElementoAnterior] = useState();

    //Estado para manejar el snapshot del elemento a modificar
    let [snap, setSnap] = useState();
    
    //consulta las tareas a la base de datos y las asigna al estado
    useEffect(() => {
            axios.get('/api/db/tareas').then((res)=>{
                setLista(() => res.data.map((tarea)=> {
                    let tareaMod = {...tarea, modificado : false, eliminado: false, nuevo: false};
                    return(tareaMod);
                }));
                setListaCopia(()=> res.data.map((tarea)=> {
                    let tareaMod = {...tarea, modificado : false, eliminado: false, nuevo: false};
                    return(tareaMod);
                }));
            }).catch((err)=> {
                console.log(err);
            });     
    }, []);

    //Consulta la listaCopia para ver si hay cambios
    //Contemplar el caso de una tarea nueva que luego es modificada, porque la 1era modificación la inserta
    //pero la segunda modificación la insertaría de nuevo. Prevenir ese caso.
    //La tarea nueva se inserta pero después no se sabe el id para modificarla. Verificar si la inserción
    //devuelve algún id para asignar a la tarea. En ese caso modificar la tarea sin llamar a la actualización

    useEffect(()=>{
        if(listaCopia === undefined){return};
        let peticion = [];
        listaCopia.forEach((tarea, indice)=>{

            if(tarea.eliminado){
                if(tarea.nuevo){return}
                peticion.push({
                    obj: lista[indice],
                    mod: 'eliminado',
                })
            } else if(tarea.nuevo) {
                if(tarea.descripcion === "" && tarea.nota === "") {return}
                peticion.push({
                    obj: lista[indice],
                    mod: 'nuevo'
                })
            } else if(tarea.modificado) {
                let modTarea = {
                    obj: lista[indice],
                    mod: 'modificado',
                    campos: []
                };

                Object.keys(tarea).forEach((llave)=>{
                    if(tarea[llave] !== lista[indice][llave] && llave !== 'modificado' ) {
                        modTarea.campos.push(llave);
                    }
                });
                
                if(modTarea.campos.length === 0){
                    console.log('tag modificado pero ningún campo es distinto!');
                    return;
                }
                peticion.push(modTarea);

            };
        });

        if(peticion.length === 0) {return};
        axios.post('/api/db/tareas',{
            consulta: JSON.stringify(peticion)
        })
    },[listaCopia]);

    //Revisa la lista para enumerar las tareas completadas
    useEffect(()=>{
        if (lista === undefined) {return}
        let newCompletadas = 0;
        lista.forEach((tarea)=> !!tarea.completado && ++newCompletadas);
        setCompletadas(newCompletadas);
    },[lista]);
    

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
        });
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

    //On blur function

    const actualizarCopia = (id, name) => {
        //Compara los campos de para determinar si la tarea fue modificada.
        //Si es así, establece la propiedad 'modificado' a true
        //Si es nuevo también modifica la propiedad en la copia para poder pasarla a la base de datos
        let tareaPrev = listaCopia.filter((tarea)=>tarea.idtareas === id)[0];
        let tareaPost = lista.filter((tarea)=>tarea.idtareas === id)[0];

        if(tareaPost[name] !== tareaPrev[name]){
            let newCopia = listaCopia.map((tarea)=>{
                if(tarea.idtareas === id) {
                    tarea.modificado = true;
                    if(tarea.nuevo === true) {
                        tarea[name] = tareaPost[name];
                    }
                }
                return(tarea);
            })
            console.log('newCopia: ',newCopia)
            console.log(' lista: ', lista);
            setListaCopia(newCopia);
        }

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
                    completado: 0,
                    modificado: false,
                    nuevo: true,
                    eliminado: false
                }
            );
            return newLista;
        })
/* //Debería actualizar la copia solo en el blur de la fila completa...
        setListaCopia((prevCopia)=> {
            let newCopia = JSON.parse(JSON.stringify(prevCopia));
            newCopia.unshift(
                {
                    idtareas: id,
                    descripcion: "",
                    nota: "",
                    deadline: "",
                    prioridad: "",
                    completado: 0,
                    modificado: false,
                    nuevo: true,
                    eliminado: false
                }
            );
            return newCopia;
        })
    */    
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

    
    const eliminarTarea = (id) => {

        setLista((prevLista)=>{
            let newLista = prevLista.map((tarea)=> {
                if(tarea.idtareas === id) {
                    tarea.eliminado = true;
                }
                return tarea;
            });
            return newLista
        });

        setListaCopia((prevCopia)=> {
            let newCopia = prevCopia.map((tarea)=> {
                if(tarea.idtareas === id) {
                    tarea.eliminado = true;
                }
                return tarea;
            });
            return newCopia;
        });
    }

    const handleFocus = (indice, id) => {
        if (elementoAnterior === undefined) { //Es el primer elemento en hacer focus
            setElementoAnterior(lista[indice]);
            //Hacer el snapshot y retornar
            setSnap(lista[indice]);
            return;
        } else if (elementoAnterior.idtareas === id) { //El focus está dentro del mismo elemento
            return;
        }
        //El focus pasó a otro elemento
        //Verificar si el elemento anterior cambió y mandar el post antes de hacer el nuevo snapshot
        let lastTarea = lista.filter((tarea)=> tarea.idtareas === snap.idtareas)[0];
        let camposModificados = []
        Object.keys(snap).forEach((llave)=> {
            if(snap[llave] !== lastTarea[llave]) {
                camposModificados.push(llave);
            }
        });
        if (camposModificados.length === 0) { //Los campos son iguales, no hay modificación
            return;
        } else { //Hay campos modificados, mandar consulta
            axios.post('/api/db/tareas', {
                tarea: lastTarea,
                campos: camposModificados
            }).then((response)=> {
                console.log('Respuesta del servidor',response);
            });
        }

        //Hacer el snapshot
        setSnap(lista[indice]);
        setElementoAnterior(lista[indice]);
        console.log('focus snap, elementoAnterior: ', elementoAnterior);

    };

    const handleBlur = (indice, id) => {
        //manejar el último blur cuando ya no hay compararción con el elemento
       /* 
        if (elementoAnterior === undefined) {
            setElementoAnterior(lista[indice])
        } else if (elementoAnterior.idtareas === id) {
            return;
        }
        console.log('blur. comparar snap y mandar post, elementoAnterior: ', elementoAnterior)
        */
        //logica para comparar el snapshot y mandar la consulta

  
    };

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
                <span></span>
                <span className="lista-tareas__prioridad">Prioridad</span>


            </li>
            
            {/*
            Extraido de los inputs
            onBlur={()=>actualizarCopia(tarea.idtareas, "descripcion")}
            onBlur={()=>actualizarCopia(tarea.idtareas, "nota")}
            onBlur={()=>actualizarCopia(tarea.idtareas, "deadline")}
            */}

            {lista && lista.filter((tarea)=>tarea.completado === 0 && tarea.eliminado === false).map((tarea, indice)=> {
                return(
                    <li onFocus={()=>handleFocus(indice, tarea.idtareas)} onBlur={()=>handleBlur(indice, tarea.idtareas)} key={tarea.idtareas} className={`lista-tareas__tarea simple-hover ${transition && 'lista-tareas__tarea--transition'} ${ desplazar && 'lista-tareas__desplazar'}`}>
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
                        <input type="date" name="deadline" onChange={(e)=>handleChange(e, tarea.idtareas)}  className="lista-tareas__deadline lista-tareas__campo" value={tarea.deadline ? moment(tarea.deadline).format('YYYY[-]MM[-]DD') : moment().format('YYYY[-]MM[-]DD') } />
                        <div className="lista-tareas__eliminar" onClick={()=>eliminarTarea(tarea.idtareas)}>
                            <img src={eliminar} className="lista-tareas__eliminar__icono" alt="eliminar"/>
                        </div>
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