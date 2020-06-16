const express = require('express');
const mysql = require('mysql');
const envParser = require('./env');

//importando las rutas
const login = require('./routes/login');
const api = require('./routes/api.v0');

//trayendo las variables de entorno
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
    app.set('db', db);
})


const app = express();

//Rutas

app.use('/login', login);
app.use('/api', api);

app.get('/',(req, res)=> {
    res.send('Hola desde el servidor');
})



app.listen('4000', () => {
    console.log('Server started on port 4000');
});

 