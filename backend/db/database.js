const mongoose = require("mongoose")

function connectToDB() {
    mongoose.connect(process.env.MONGODB_URI)
    .then((conn)=>{
        console.log(`Database connected `)
    })
    .catch((err)=>{
        console.log( "DB error : ", err.message)
    })
}
module.exports = connectToDB