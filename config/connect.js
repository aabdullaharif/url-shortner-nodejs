const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const connectToMongoDB = async (url)=>{
    return mongoose.connect(url);
}

module.exports = {
    connectToMongoDB
}