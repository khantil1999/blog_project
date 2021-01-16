const mongoose = require('mongoose');

const topicSchema=new mongoose.Schema({
    topicTitle:{
        type:String,
        required:[true,"Topic Can Not Be Blank"],
        minlength:[2,'Title must me greate then 3 character'],
        unique:true,
        trim:true

    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }

},{timestamps:true})



topicSchema.pre('save',function(next){
    
    this.topicTitle=this.topicTitle.toLowerCase();
    next()
});

const Topic=mongoose.model('topic',topicSchema)

module.exports=Topic;