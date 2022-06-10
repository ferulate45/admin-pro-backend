/*
    Ruta: /api/upload
 */

const {Router} = require('express');
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, getImagen } = require('../controllers/uploads');

const router = Router();

router.use(expressFileUpload());

router.put('/:recordType/:id', validarJWT, fileUpload);
router.get('/:recordType/:imagen', validarJWT, getImagen);


module.exports = router;