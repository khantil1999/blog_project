const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    postTitle:{
        type:String,
        trim:true
    },
    postDescription:{
        type:String,
        trim:true
    },
    postImage:{
        type:String,
    },
    postDate:{
        type:Date,
    },
    topicId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'topic'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
    
})


const Post=mongoose.model('post',postSchema);


module.exports=Post