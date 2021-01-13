const mongoose=require('mongoose');

const commentsSchema=new mongoose.Schema({
    description:{
        type:String,
        trim:true,
        minlength:[10,"Description must be ten or more character"]
    },
    dateTime:{
        type:Date,
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})


const Comments=mongoose.model('comments',commentsSchema);


module.exports=Comments;