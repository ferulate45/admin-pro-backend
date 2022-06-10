const {response} = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
                                        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    });
};

const crearHospital = async (req, res = response) => {

    const hospital = new Hospital({
        usuario: req.uid,
        ...req.body
    });

    try {

        const hospitalDb = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDb
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "ok": false,
            "msg": "Error inesperado, revisar logs..."
        })
    }
};

const actualizarHospital = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarHospital'
    });
};

const borrarHospital = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarHospital'
    });
};


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}