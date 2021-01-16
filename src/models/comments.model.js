const mongoose=require('mongoose');
const Topic=require('./topic.model');


const commentsSchema=new mongoose.Schema({
    description:{
        type:String,
        trim:true,
        required:[true,'Description Can Not Be Blank']

    },
    dateTime:{
        type:Date,
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post',
        required:[true,'Post Is Required'],
    
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})


const Comments=mongoose.model('comments',commentsSchema);


module.exports=Comments;