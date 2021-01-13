const mongoose=require('mongoose');

const likesSchema=new mongoose.Schema({
    isLike:{
        type:Boolean
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


const Likes=mongoose.model('like',likesSchema);


module.exports=Likes;