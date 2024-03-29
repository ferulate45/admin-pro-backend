require('dotenv').config();
const path = require('path');

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


//Directorio publico
app.use(express.static('public'));

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/search', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});



app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto: ' + process.env.PORT);
});