const {response} = require('express');
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {
    const medicos = await Medico.find()
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    });
};

const crearMedico = async (req, res = response) => {
    const medico = new Medico({
        usuario: req.uid,
        ...req.body
    });

    try {

        const medicoDb = await medico.save();

        res.json({
            ok: true,
            medico: medicoDb
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "ok": false,
            "msg": "Error inesperado, revisar logs..."
        })
    }
};

const actualizarMedico = async (req, res = response) => {
    const id = req.params.id;
    try {

        const medicoDb = await Medico.findById(id);
        if(!medicoDb){
            return res.status(400).json({
                "ok": false,
                "msg": "Medico no encontrado"
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: req.uid
        };

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true});

        res.json({
            ok: true,
            medico: medicoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "ok": false,
            "msg": "Error inesperado, revisar logs..."
        })
    }
};

const borrarMedico = async (req, res = response) => {

    const id = req.params.id;
    try {

        const medicoDb = await Medico.findById(id);
        if(!medicoDb){
            return res.status(400).json({
                "ok": false,
                "msg": "Medico no encontrado"
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: "Medico eliminado"
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}