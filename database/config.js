const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = () => {

    try {
        mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('db online');
    } catch (error) {
        console.log(error);
        throw new Error('error iniciando db');
    }


}

module.exports = {
    dbConnection
}