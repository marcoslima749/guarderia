import React, { useState , useEffect } from 'react';

import axios from 'axios';

import './Tareas.css'

import mas from '../../shared/components/iconos/mas.svg';
import listo from '../../shared/components/iconos/listo.svg';
import eliminar from '../../shared/components/iconos/eliminar.svg';

const moment = require('moment');


export const Tareas = ({setHeader}) => {
    
    
    let [ lista, setLista ] = useState();
    /*   let [listaCopia, setListaCopia] = useState();*/
    let [completadas, setCompletadas] = useState(0);
    
    //Estados para manejar el CSS a través de las clases
    let [desplazar, setDesplazar] = useState(false);
    let [transition, setTransition] = useState(true);
    
    //Estado para manejar el blur y el focus dentro del mismo elemento
    let [elementoAnterior, setElementoAnterior] = useState();
    
    //Estado para manejar el snapshot del elemento a modificar
    let [snap, setSnap] = useState();
    
    useEffect(()=> {
        setHeader.setNombreHeader("CYNM");
        setHeader.setDescripcionHeader("Tareas")
        setHeader.setPanelHeader(null);
    },[])
    
    // ****************
    //La idea es que al modificar cualquier tarea se ponga un timer a correr para actualizar la base
    //siempre con el último valor de la tarea. Cuando termina el timer se actualiza la base.
    //con cada modificacion el timer se reinicia
    //objetivo: actualizar la base 2500ms después de la última modificación
    //ó si el focus sale de la lista (ultimo blur) [o cambia de tarea ???]
    //se puede hacer una copia de la tarea modificada antes de hacer el cambio y de ahí sacar el cambio
    //o directamente poner la última versión de la tarea en una queue para enviar como 'modificaciones'
    //pero mandar la queue importa la modificación de la función 'mandar consulta' para aceptar múltiples
    //tareas
    
    //Al final agregué un timer para llamar a la función 'verificar cambios'
    //y una variable para establecer si hacerlo o no.
    //El resto sigue igual.
    
    //Cuenta regresiva para actualizar la base
    let [timer, setTimer] = useState(0);
    let [verificar, setVerificar] = useState(false);
    
    //Cuando el timer se pone en un valor tope (2500 por ahora) lo empieza a descontar hasta que esté en cero
    
    useEffect(()=>{
        if (timer === 0) {
            console.log('Timer en 0');
            if(!verificar) {
                console.log('No verificar');
                setVerificar(true);
                return;
            }
            verificarCambios();
        }
        if (timer < 0) {
            console.log('timer menor que 0: ', timer);
            return;
        }
        let idTimeOut = setTimeout(()=>{
            console.log('timer: ', timer);
            setTimer((prevTimer)=>{
                let newTimer = prevTimer - 500;
                return newTimer;
            })
        }, 500);
        
        return ()=> {
            clearTimeout(idTimeOut);
        }
        
    }, [timer]);
    
    
    //consulta las tareas a la base de datos y las asigna al estado
    useEffect(() => {
        axios.get('/api/db/tareas').then((res)=>{
            setLista(() => res.data.map((tarea)=> {
                let tareaMod = {...tarea /*, modificado : false, eliminado: false, nuevo: false*/ };
                return(tareaMod);
            }));
            /*                setListaCopia(()=> res.data.map((tarea)=> {
                let tareaMod = {...tarea, modificado : false, eliminado: false, nuevo: false};
                return(tareaMod);
            })); */
        }).catch((err)=> {
            console.log(err);
        });     
        
        
    }, []);

    
    //Revisa la lista para enumerar las tareas completadas
    useEffect(()=>{
        if (lista === undefined) {return}
        let newCompletadas = 0;
        lista.forEach((tarea)=> !!tarea.completado && ++newCompletadas);
        setCompletadas(newCompletadas);
    },[lista]);
    
    
    const completarTarea = (indice, id,e) => {
        //Al hacer click en el boton se genera un blur en el elemento y como no es un input no se produce focus.
        //Esto es interpretado como último blur, se verifican cambios y setean snap y último elemento a undefined.
//Blur no puede ser evitado con preventDefault y siempre va a suceder esto antes de llamar a completarTarea
//Por lo tanto hay que manejar este cambio por fuera de el flujo 'focus-edicion-blur'

        e.preventDefault();


        
        //Setear el cambio en la lista
        let foco = lista.filter((tarea) => tarea.idtareas === id)[0];
        setLista((prevLista)=> {
            let newLista = prevLista.map((tarea) => {
                if(tarea.idtareas === id) {
                    tarea.completado = 1;
                }
                return tarea;
            });
            return newLista;
        });
        
        enviarConsulta(foco, 'modificado', ['completado']);

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
                    completado: 0,
                }
            );
            return newLista;
        })

    }

    const handleChange = (e, id) => {
        setVerificar(true);
        setTimer(2500);
        let prevLista = JSON.parse(JSON.stringify(lista));
        let newLista = prevLista.map((tarea)=>{
            if(tarea.idtareas === id) {
                tarea[e.target.name] = e.target.value;
            }
            return tarea;
        });
        setLista(newLista);
    }

    const eliminarEnLista = (tareaEliminada) => {
        setLista((prevLista)=> {
            let newLista = prevLista.filter((tarea)=>tarea.idtareas !== tareaEliminada.idtareas);
            return newLista;
        });
    }

    const enviarConsulta = (tarea, mod, campos = []) => {
        console.log('enviando consulta. tarea : ', tarea, ' mod: ', mod, ' campos: ', campos);
        axios.post('/api/db/tareas', {
            tarea,
            mod,
            campos
        }).then((response)=> {
            console.log('response: ', response);
            if(mod === 'nuevo'){ 
                console.log('insertada exitosamente una tarea nueva. Cambiando id en la lista');
                setLista((prevLista)=> {
                    let newLista = prevLista.map((tareaEnLista) => {
                        if (tareaEnLista.idtareas === tarea.idtareas) {
                            console.log('coinciden las id viejas. Id en la lista: ' + tareaEnLista.idtareas + ' id en la tarea mandada: ' + tarea.idtareas)
                            console.log('response: ', response);
                            console.log('response.data: ', response.data);
                            console.log('response.data.nuevaID: ', response.data.nuevaID);
                            if(tarea.idtareas === snap.idtareas ) {
                                console.log('tarea.idtareas: ', tarea.idtareas, ' snap id', snap.idtareas);
                                setSnap({...tarea, idtareas: response.data.nuevaID})
                            }
                            tareaEnLista.idtareas = response.data.nuevaID;
                        };
                        return tareaEnLista;
                    });
                    return newLista;
                });
            } else {console.log('mod no es nuevo: ', mod)};
            console.log('Respuesta del servidor',response);
        }).catch((err)=>{
            console.log('Error en axios response: ',err);
            throw err;
        });
    }
    
    const eliminarTarea = (id) => {
        if(id < 1) { // es 0.algoo así que es nuevo
            console.log('eliminando una tarea nueva');
            let tareaEliminada = lista.filter((tarea)=>tarea.idtareas === id)[0];
            eliminarEnLista(tareaEliminada);
        } else {
            console.log('eliminando una tarea vieja');
            console.log('id: ', id);
            let tareaEliminada = lista.filter((tarea)=>tarea.idtareas === id)[0];
            console.log('tareaEliminada: ',tareaEliminada);
            enviarConsulta(tareaEliminada, 'eliminado');
            eliminarEnLista(tareaEliminada);
        }

    }

    const handleFocus = (indice, id) => {
        let foco = lista.filter((tarea) => tarea.idtareas === id)[0];

        console.log('focus. indice: ', indice, ' id: ', id);
        if (elementoAnterior === undefined) { //Es el primer elemento en hacer focus
            console.log('elemento anterior undefined: ' + elementoAnterior);
            console.log('NOOO se va a setear el anterior a la lista[indice]: ' + JSON.stringify(lista[indice]));
            console.log('se va a setear el anterior a AL ID ENFOCADO ' + JSON.stringify(foco));

            setElementoAnterior(foco);
            //Hacer el snapshot y retornar
            setSnap(foco);
            return;
        } else if (elementoAnterior.idtareas === id) { //El focus está dentro del mismo elemento
            return;
        }
        //El focus pasó a otro elemento
        //Verificar si el elemento anterior cambió y mandar el post antes de hacer el nuevo snapshot
        setVerificar(false);
        verificarCambios();
        //Hacer el snapshot
        setSnap(foco);
        setElementoAnterior(foco);

    };

    const verificarCambios = () => {
        //Verificar si el elemento anterior cambió y mandar el post antes de hacer el nuevo snapshot
        console.log('verificando cambios');
        console.log('snap.idtareas: ', snap.idtareas);
        let lastTarea = lista.filter((tarea)=> {
            console.log('tarea.idtareas: ', tarea.idtareas);
            return tarea.idtareas === snap.idtareas
        })[0];
        console.log('lasttarea: ', lastTarea);
        let camposModificados = []
        console.log('snap: ', snap);
        Object.keys(snap).forEach((llave)=> {
            if(snap[llave] !== lastTarea[llave]) {
                camposModificados.push(llave);
            }
        });
        if (camposModificados.length === 0) { //Los campos son iguales, no hay modificación
            console.log('los campos son iguales, no hay modificacion. lastTarea: ', lastTarea, ' snap: ', snap)
            return;
        } else { //Hay campos modificados, mandar consulta
            let mod = 'modificado';
            console.log('hay campos modificados: ', camposModificados);
            console.log('verificando si es nuevo');
            if(lastTarea.idtareas < 1) {
                console.log('es nuevo');
                mod = 'nuevo';
            };
            enviarConsulta(lastTarea, mod, camposModificados);
        }
    }

    const handleBlur = (indice, id) => {
        //manejar el último blur cuando ya no hay compararción con el elemento
        console.log('blur')
        if(elementoAnterior.idtareas === id) {
            console.log('el elemento anterior es igual al actual (posible ultimo blur)');
            //checkear que no hay focus en el resto de los elementos para determinar que es el último
            setTimeout(()=>{
                let ultimoBlur = ![].slice.call(document.getElementsByClassName('lista-tareas__tarea')).some((el)=>el.matches(':focus-within'));
                if(ultimoBlur) {
                    //checkear si hay cambios para mandar el post
                    console.log('ultimo blur');
                    verificarCambios();
                    setElementoAnterior(undefined);
                    setSnap(undefined);
                }
            },0)
        }
  
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
            

            {lista && lista.filter((tarea)=>tarea.completado === 0).map((tarea, indice)=> {
                return(
                    <li onFocus={()=>handleFocus(indice, tarea.idtareas)} onBlur={()=>handleBlur(indice, tarea.idtareas)} key={tarea.idtareas} className={`lista-tareas__tarea simple-hover ${transition && 'lista-tareas__tarea--transition'} ${ desplazar && 'lista-tareas__desplazar'}`}>
                        <div className="lista-tareas__completado" onClick={(e)=>completarTarea(indice, tarea.idtareas, e)} >
                            <img src={listo} alt="Tilde"/>
                        </div>
                        <div className="lista-tareas__info">
                        <div className="lista-tareas__campo-descripcion">
                            <input type="text" onChange={(e)=>handleChange(e, tarea.idtareas)} name="descripcion" spellCheck="false" className="lista-tareas__descripcion lista-tareas__campo" value={tarea.descripcion ? tarea.descripcion : ''} />
                        </div>
                        <div className="lista-tareas__campo-nota">
                            <input type="text" onChange={(e)=>handleChange(e, tarea.idtareas)} name="nota" spellCheck="false" className="lista-tareas__nota lista-tareas__campo" value={tarea.nota ? tarea.nota : ''} />
                        </div>    
                        </div>
                        <input type="date" name="deadline" onChange={(e)=>handleChange(e, tarea.idtareas)}  className="lista-tareas__deadline lista-tareas__campo" value={tarea.deadline ? moment(tarea.deadline).format('YYYY[-]MM[-]DD') : '' } />
                        <div className="lista-tareas__eliminar" onClick={()=>eliminarTarea(tarea.idtareas)}>
                            <img src={eliminar} className="lista-tareas__eliminar__icono" alt="eliminar"/>
                        </div>
                        <div className="lista-tareas__campo-prioridad">
                            <input type="text" onChange={(e)=>handleChange(e, tarea.idtareas)} name="prioridad" spellCheck="false" className="lista-tareas__prioridad lista-tareas__campo" value={tarea.prioridad ? tarea.prioridad : ''} />
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