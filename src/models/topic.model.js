const mongoose = require('mongoose');

const topicSchema=new mongoose.Schema({
    topicTitle:{
        type:String,
        required:true,
        minlength:[2,'Title must me greate then 3 character'],
        unique:true
    }

})

topicSchema.virtual('posts',{
    ref: 'post',
    localField: '_id',
    foreignField: 'topicId'
})



const Topic=mongoose.model('topic',topicSchema)

module.exports=Topic;