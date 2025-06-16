const mongoose = require ('mongoose')


function connectToDb(){
    mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => {console.log('Connected to DB')}) //sucess in connection 
    .catch((err)=>{console.log('DB connection failed :', err)}) //error in connecting database 
}

module.exports = connectToDb