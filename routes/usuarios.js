/*
    Ruta: /api/usuarios
 */

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario} = require('../controllers/usuarios');
const { validarJWT, validarAdminRole, validarAdminRoleOMismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post('/', [
    check('nombre', 'El nombre es requerido').notEmpty(),
    check('password', 'El password es requerido').notEmpty(),
    check('email', 'El email es requerido').isEmail(),
    validarCampos
], crearUsuario);

router.put('/:id', [
    validarJWT,
    validarAdminRoleOMismoUsuario,
    check('nombre', 'El nombre es requerido').notEmpty(),
    check('email', 'El email es requerido').isEmail(),
    check('role', 'El role es requerido').notEmpty(),
    validarCampos
], actualizarUsuario);

router.delete('/:id', [validarJWT, validarAdminRole], borrarUsuario);

module.exports = router;