const jwt = require("jsonwebtoken");
const Usuario = require('../models/usuario');

const validarJWT = (req, res, next) => {

    //Leer token
    const token = req.header('token');
    
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No token provided'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.uid = uid;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

    next();
};

const validarAdminRole = async (req, res, next) => {

    const id = req.uid;
    try {
        const usuarioDb = await Usuario.findById(id);
        if(!usuarioDb){
            return res.status(400).json({
                "ok": false,
                "msg": "Usuario no existe"
            });
        }

        if(usuarioDb.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                "ok": false,
                "msg": "No tiene permisos para realizar la accion"
            });      
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte su administrador'
        }); 
    }
}

const validarAdminRoleOMismoUsuario = async (req, res, next) => {

    const pId = req.params.id;
    const id = req.uid;
    try {
        const usuarioDb = await Usuario.findById(id);
        if(!usuarioDb){
            return res.status(400).json({
                "ok": false,
                "msg": "Usuario no existe"
            });
        }

        if(usuarioDb.role === 'ADMIN_ROLE' || id === pId){
            next();
        }else{
            return res.status(403).json({
                "ok": false,
                "msg": "No tiene permisos para realizar la accion"
            });
        }        

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte su administrador'
        }); 
    }
}

module.exports = {
    validarJWT,
    validarAdminRole,
    validarAdminRoleOMismoUsuario
}