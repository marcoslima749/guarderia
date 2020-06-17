const express = require('express');
const mysql = require('mysql');
const envParser = require('./utils/env');

//importando las rutas
const login = require('./routes/login');
const api = require('./routes/api.v0');

//trayendo las variables de entorno
const env = envParser();

//creando la conección a la base de datos
//puede que esto no sea escalable con múltiples usuarios porque estarían usando todos la misma conexión.
//revisar si esto ocasiona problemas de performance o una posible caída del servidor
//si es así modificar para que cada usuario tenga su propia conección a la base de datos

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

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Rutas

app.use('/login', login);
app.use('/api', api);

app.get('/',(req, res)=> {
    //Acá mandar la reactapp
    res.send('Hola desde el servidor');
})



app.listen('4000', () => {
    console.log('Server started on port 4000');
});

 