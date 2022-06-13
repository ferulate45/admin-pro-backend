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
    const id = req.params.id;
    try {

        const hospitalDb = await Hospital.findById(id);
        if(!hospitalDb){
            return res.status(400).json({
                "ok": false,
                "msg": "Hospital no encontrado"
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: req.uid
        };

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new: true});

        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "ok": false,
            "msg": "Error inesperado, revisar logs..."
        })
    }
};

const borrarHospital = async (req, res = response) => {

    const id = req.params.id;
    try {

        const hospitalDb = await Hospital.findById(id);
        if(!hospitalDb){
            return res.status(400).json({
                "ok": false,
                "msg": "Hospital no encontrado"
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: "Hospital eliminado"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "ok": false,
            "msg": "Error inesperado, revisar logs..."
        })
    }
};


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}