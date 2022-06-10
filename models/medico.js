const {Schema, model} = require('mongoose');

const MedicosSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    img:{
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }  
});

MedicosSchema.method('toJSON' , function(){
    const {__v, _id, ...object}  = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Medicos', MedicosSchema);