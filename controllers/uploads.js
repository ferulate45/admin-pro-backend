
const {response} = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const {actualizarImagen} = require('../helpers/actualizar-imagen');



const fileUpload = (req, res = response) => {

    const uid = req.params.id;
    const tipo = req.params.recordType;

    const validTypes = ['usuarios', 'medicos', 'hospitales'];

    if(!validTypes.includes(tipo)){
        return res.status(400).json({
            "ok": false,
            "msg": "Colleccion no existe. Opciones: usuarios/medicos/hospitales"
        });
    }

    //se valida que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            "ok": false,
            "msg": "no se ha cargado ningun archivo"
        });
    }

    //procesar imagen
    const file = req.files.imagen;
    const fileExtension = file.name.split('.').pop();

    //validar extension
    const validExtentions = ['png', 'jpg', 'jpeg', 'gif'];
    if(!validExtentions.includes(fileExtension)){
        return res.status(400).json({
            "ok": false,
            "msg": "Extension no valida. Opciones:" +  fileExtension.join('/')
        });
    }

    //generar nombre archivo
    const newFieldName = `${uuidv4()}.${fileExtension}`;

    //path para guardar archivo
    const path = `./uploads/${tipo}/${newFieldName}`;


    // mover imagen
    file.mv(path, (err) => {
        if (err)
        {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: "error al mover la imagen"
            });
        }

        //update base de datos
        actualizarImagen(tipo, uid, newFieldName);

        res.json({
            ok: true,
            msg: "file uploaded",
            newFieldName
        });
    });
};

const getImagen = (req, res = response) => {
    const tipo = req.params.recordType;
    const imagen = req.params.imagen;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${imagen}`);


    //default image
    if(!fs.existsSync(pathImg)){        
        res.sendFile(path.join(__dirname,'../uploads/no_image.png'));
    }else{
        res.sendFile(pathImg);
    }
};

module.exports = {
    fileUpload,
    getImagen
}