/*
    Ruta: /api/search
 */

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getAll, getByType } = require('../controllers/busquedas');

const router = Router();

router.get('/:value', validarJWT, getAll);
router.get('/in/:collection/:value', validarJWT, getByType);


module.exports = router;