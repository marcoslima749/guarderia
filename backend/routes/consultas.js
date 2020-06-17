const express = require('express');
const routes = express.Router();

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
    db.query('SELECT * FROM tareas',(error, results, fields) => {
        if (error) throw error;
        res.json(results);
        
    })
});

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