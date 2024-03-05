const mongoose = require('mongoose');
const colors = require('colors');


const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`MONGO Connected ${mongoose.connection.host}`.bgMagenta.white);
    }
    catch(err){
        console.log(`MONGO Connect Error ${err}`.bgRed.white);
    }
}

module.exports = connectDB;