const express = require('express');
const routes = express.Router();
const sql = require('./consultas/sql');

routes.get('/embarcaciones',(req, res) => {
    console.log('get en embaracciones');
    const db = req.app.get('db');
    db.query('SELECT * FROM embarcaciones',(error, results, fields) => {
        if (error) throw error;
        console.log('results: ', JSON.stringify(results));
        res.json(results);
        
    })
    console.log(req.body);
});

routes.get('/tareas',(req, res) => {
    const db = req.app.get('db');
    db.query(sql.tareas.todo ,(error, results, fields) => {
        if (error) throw error;
        res.json(results);
    })
});

routes.post('/tareas',(req,res)=> {
    let log = 'LOG: ---------------------------------------------\n\n';
    const db = req.app.get('db');
    let consulta = '';
    let tarea = JSON.parse(JSON.stringify(req.body.tarea));
    let campos = [];
    let valores = [];

    log += 'request body: ' + JSON.stringify(req.body) + '\n\n';

    switch (req.body.mod) {
        case 'nuevo' :
            delete tarea.idtareas;
            campos = Object.keys(tarea);
            valores = campos.map((llave)=>tarea[llave])
            consulta = sql.tareas.insertar(campos, valores); 
            log += 'Case: nuevo. Campos: ' + JSON.stringify(campos) + 'Valores: ' + JSON.stringify(valores) + 'Consulta: ' + JSON.stringify(consulta) + '\n\n';
            break;
        case 'modificado' :
            campos = req.body.campos;
                consulta = campos.map((llave)=>sql.tareas.modificar(llave, tarea[llave], tarea.idtareas)).join(';');
                log += 'Case: modificado. Campos: ' + campos + 'Consulta: ' +  JSON.stringify(consulta) + '\n\n';
            break;
        case 'eliminado':
            consulta = sql.tareas.eliminar(tarea.idtareas);
            log += 'Case: Elminidado. Consulta: ' + JSON.stringify(consulta) + '\n\n';
            break;
        default:
            log += 'Valor inválido en la propiedad mod del request body: ' + req.body.mod + '\n\n';
            log+= 'Final LOG ----------------------------------------'
            console.log(log);
            return;
        };


        log+= 'Reemplazando valores vacios por null \n\n';
        consulta = consulta.replace(/''/g, 'null');
        log+= 'Consulta modificada:\n\n' + JSON.stringify(consulta) + '\n\n';


        db.query(consulta, (error, results, _fields)=>{
            if (error) {
                log += 'ERROR!: ' + error + '\n\n';
                log += 'Final LOG ----------------------------------------'
                console.log(log);
                throw error;
            }

            log += 'Base consultada correctamente. Results: ' +  JSON.stringify(results) + '\n\n';
            if (req.body.mod === 'nuevo') {
                log+= 'Enviando Respuesta (NUEVO): ' + JSON.stringify({results, nuevaID : results.insertId}) + '\n\n';
                res.json({results, nuevaID : results.insertId});
            } else {
                log+= 'Enviando Respuesta (NO NUEVO): ' + JSON.stringify(results) + '\n\n';
                res.send(results);
            }
            
            log+= 'Final LOG ----------------------------------------'
            console.log(log);

        });
            
});

/*
para obtener el id de una fila insertada

connection.query('INSERT INTO posts SET ?', {title: 'test'}, function (error, results, fields) {
  if (error) throw error;
  console.log(results.insertId);
});

*/
//copia
//consulta de una sola tabla con una condición opcional
/*
routes.get('/:tabla',(req, res) => {
    switch(req.params.tabla) {
        case 'embarcaciones':

            break;


            default:
                res.sendStatus(404).send('No se encuentra la tabla');
    }


    const db = req.app.get('db');
    db.query('SELECT * FROM embarcaciones',(error, results, fields) => {
        if (error) throw error;
        res.json(results);
    })
});
*/



routes.get('/embarcaciones/:emb', (req, res)=> {
    const db = req.app.get('db');
    const nombre = req.params.emb;
    db.query(`SELECT * FROM embarcaciones WHERE embarcaciones.nombre ='${nombre}'`, (error, results, fields)=>{
        if (error) throw error;
        res.json(results);
    })

});

routes.get('/', (req, res)=> {
    res.send('api db funciona');   
});



module.exports = routes;