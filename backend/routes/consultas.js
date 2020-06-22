const express = require('express');
const routes = express.Router();
const sql = require('./consultas/sql');

routes.get('/embarcaciones',(req, res) => {
    const db = req.app.get('db');
    db.query('SELECT * FROM embarcaciones',(error, results, fields) => {
        if (error) throw error;
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
    let log = '';
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
            valores = campos.map((llave)=>tarea[llave]);
            consulta = sql.tareas.insertar(campos, valores);
            log += consulta + '\n\n';
            break;
        case 'modificado' :
            campos = req.body.campos;
            consulta = campos.map((llave)=>sql.tareas.modificar(llave, tarea[llave], tarea.idtareas)).join(';');
            log += consulta + '\n\n';
            break;
        case 'eliminado':
            consulta = sql.tareas.eliminar(tarea.idtareas);
            log += consulta + '\n\n';
            break;
        default:
            log += 'Valor inválido en la propiedad mod del request body: ' + req.body.mod + '\n\n';
            console.log(log);
            return;
    };

    db.query(consulta, (error, results, fields)=>{
        if (error) {
            log += error;
            console.log(log);
            throw error;
        }
        if (req.body.mod === 'nuevo') {
            res.json(results);
            // res.json(results.insertId);
        } else {
            res.send(results);
        }
        log += 'Base consultada correctamente. Results: ' +  JSON.stringify(results) + '\n\n';
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