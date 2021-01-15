const mongoose = require('mongoose');

const topicSchema=new mongoose.Schema({
    topicTitle:{
        type:String,
        required:[true,"Topic Can Not Be Blank"],
        minlength:[2,'Title must me greate then 3 character'],
        unique:true
    }

})





const Topic=mongoose.model('topic',topicSchema)

module.exports=Topic;