//invocamos a express
const express = require('express');
const app = express();

//seteamos urlencoded para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

//seteamos donde el directorio public para que node lo encuentre aunque movamos el proyecto a otro pc
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//Establecemos el motor de plantillas ejs
app.set('view engine', 'ejs');

//Invocamos al modulo bcryptjs para hacer el hashing(encrypt) de las passwords
 const bcryptjs = require('bcryptjs');

// variable de session
const session = require('express-session');
app.use(session({
    secret:'secret', 
    resave:true,
    saveUninitialized:true
}))


//Invocamos al Modulo de Conexion de Base de Datos
const connection = require('./database/db');

//Estableciendo las Rutas
app.get('/',(req, res) =>{
    res.render('index.ejs', {msg: 'Esto es un mensaje desde Node'});
} )

app.get('/login', (req, res)=>{
    res.render('login.ejs');
})


//Inicializando el Servidor de NodeJS con ExpressJS
app.listen(3000,(req, res) =>{
    console.log('SERVER RUNNING IN http://localhost:3000');
})