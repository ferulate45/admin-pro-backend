require('dotenv').config();

const express = require('express');
const cors = require('cors');

const {dbConnection} = require('./database/config');

//Crear el servidor de express
const app = express();

//configurar CORS
app.use(cors());

//lectura y parse del body
app.use(express.json());

//Base de datos
dbConnection();
//MONGO
//mongodb
//7nDcFF9PCjN2eeVA
//mongodb+srv://mongodb:7nDcFF9PCjN2eeVA@cluster0.kx4d6ho.mongodb.net/hospital


//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));



app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto: ' + process.env.PORT);
});