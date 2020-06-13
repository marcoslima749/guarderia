const express = require('express');
const mysql = require('mysql');
const envParser = require('./env');

const env = envParser();

//creando la conección a la base de datos


const db = mysql.createConnection({
    host : env.DB_HOST,
    user : env.DB_USUARIO,
    password: env.DB_PASS,
    database: env.DB_BASE
});
 
db.connect((err)=> {
    if(err){
        throw err;
    }
    console.log("Base de datos conectada!");
})


const app = express();

//Rutas

app.get('/',(req, res)=> {

    db.query('SELECT * FROM embarcaciones',(error, results, fields) => {
        if (error) throw error;
        console.log(results[0].nombre);
    })

    res.send('Hola desde el servidor');
})



app.listen('4000', () => {
    console.log('Server started on port 4000');
});

 