const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = (tipo, imgName) => {
    const previousPath = `./uploads/${tipo}/${imgName}`;
    if(fs.existsSync(previousPath)){
        
        //borrar previous img
        fs.unlinkSync(previousPath);
    }
};

const actualizarImagen = async (tipo, id, nombreArchivo) =>{ 
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if(!medico){
                console.log('medico no existe');
                return false;
            }

            borrarImagen(tipo, medico.img);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if(!hospital){
                console.log('hospital no existe');
                return false;
            }

            borrarImagen(tipo, hospital.img);
            
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;  
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                console.log('usuario no existe');
                return false;
            }

            borrarImagen(tipo, usuario.img);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
    }
};


module.exports = {
    actualizarImagen
}