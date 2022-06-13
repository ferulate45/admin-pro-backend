/*
    Ruta: /api/login
 */

const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

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

module.exports = router;