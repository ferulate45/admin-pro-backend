const {response} = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getAll = async (req, res = response) => {

    const busqueda = req.params.value;

    const regex = new RegExp(busqueda, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({nombre: regex}),
        Medico.find({nombre: regex}),
        Hospital.find({nombre: regex})
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
};

const getByType = async (req, res = response) => {

    const busqueda = req.params.value;
    const tabla = req.params.collection;

    const regex = new RegExp(busqueda, 'i');

    let data = [];
    switch (tabla) {
        case 'medicos':
            data = await Medico.find({nombre: regex})
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
            break;  
        case 'hospitales':
            data = await Hospital.find({nombre: regex})
                                    .populate('usuario', 'nombre img');;
            break;    
        case 'usuarios':
            data = await Usuario.find({nombre: regex});
            break;
        default:
            return res.status(400).json({
                "ok": false,
                "msg": "Colleccion no existe. Opciones: usuarios/medicos/hospitales"
            });
    }

    return res.json({
        ok: true,
        result: data
    });

};


module.exports = {
    getAll,
    getByType
}