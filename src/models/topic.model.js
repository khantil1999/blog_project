const mongoose = require('mongoose');

const topicSchema=new mongoose.Schema({
    topicTitle:{
        type:String,
        trim:true,
    }

})



const Topic=mongoose.model('topic',topicSchema)

module.exports=Topic;