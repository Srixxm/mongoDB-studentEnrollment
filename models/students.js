const mongoose = require('mongoose')
const studSchema = mongoose.Schema({
    name:{
        type:String,
        require : true
    },
    enrollDepartment:{
        type:String,
        require : true
    },
    enrollDate : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model(`studentsModel`, studSchema)