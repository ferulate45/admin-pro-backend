const {response} = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const login = async (req, res = response) => {

    const {email, password} = req.body;
    try {

        const usuarioDb = await Usuario.findOne({email});

        if(!usuarioDb){
            res.status(404).json({
                "ok": false,
                "msg": "Usuario o password incorrecto"
            });
        }

        const validPassword = bcrypt.compareSync(password, usuarioDb.password);
        if(!validPassword){
            res.status(404).json({
                "ok": false,
                "msg": "Usuario o password incorrecto"
            });
        }

        const token = await generarJWT(usuarioDb.id);

        res.json({
            "ok": true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "ok": false,
            "msg": "Error inesperado, contacte al administrador"
        });
    }
};

module.exports = {
    login
}