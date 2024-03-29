const {response} = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');


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
            token,
            menu: getMenuFrontEnd(usuarioDb.role)
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "ok": false,
            "msg": "Error inesperado, contacte al administrador"
        });
    }
};

const googleSignIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try {
        const {name, email, picture} = await googleVerify(googleToken);

        let usuario;
        const usuarioDb = await Usuario.findOne({email});
        if(!usuarioDb){
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        }else{
            usuario = usuarioDb;
            usuario.img = picture;
            usuario.google = true;
        }

        await usuario.save();

        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuario.role)
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            "ok": false,
            "msg": "Token invalido"
        });  
    }
};

const renewToken = async (req, res = response) => {
    
    const uid = req.uid;
    const token = await generarJWT(uid);

    const usuario = await Usuario.findById(uid);
    
    res.json({
        ok: true,
        usuario,
        token,
        menu: getMenuFrontEnd(usuario.role)
    });
};


module.exports = {
    login,
    googleSignIn,
    renewToken
}