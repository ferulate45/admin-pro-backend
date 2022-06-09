const jwt = require("jsonwebtoken");

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


module.exports = {
    validarJWT
}