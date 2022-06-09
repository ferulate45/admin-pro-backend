const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res)=>{

    const usuarios = await Usuario.find({}, 'nombre email google role');
    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    });
};

const crearUsuario = async (req, res = response)=>{

    const {password, email} = req.body;

    try {
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                "ok": false,
                "msg": "El correo ya ha sido registrado"
            });
        }

        const usuario = new Usuario(req.body);

        //encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Save
        await usuario.save();

        
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            "ok": false,
            "msg": "Error inesperado, revisar logs..."
        })
    }
};

const actualizarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDb = await Usuario.findById(uid);

        if(!usuarioDb){
            return res.status(400).json({
                "ok": false,
                "msg": "Usuario no existe"
            });
        }

        const {password, google, email, ...campos} = req.body;

        if(usuarioDb.email !== email){
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    "ok": false,
                    "msg": "Email ya ha sido registrado, intente con otro email"
                });
            }
        }

        campos.email = email;
        const usuarioUpdated = await Usuario.findByIdAndUpdate(uid, campos, {new: true});        

        res.json({
            "ok": true,
            usuario: usuarioUpdated
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "ok": false,
            "msg": "Error inesperado, revisar logs..."
        })
    }
};

const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDb = await Usuario.findById(uid);
        if(!usuarioDb){
            return res.status(400).json({
                "ok": false,
                "msg": "usuario no existe"
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            "ok": true,
            "msg": "usuario eliminado"
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
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}