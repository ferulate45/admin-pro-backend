/*
    Ruta: /api/login
 */

const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', [
    check('email', 'El correo es requerido').isEmail(),
    check('password', 'El password es requerido').notEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('token', 'Token de Google es requerido').notEmpty(),
    validarCampos
], googleSignIn);

router.get('/renew', validarJWT, renewToken);

module.exports = router;