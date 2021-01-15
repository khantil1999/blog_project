const mongoose=require('mongoose');
const Post=require('./post.model');

const likesSchema=new mongoose.Schema({
    isLike:{
        type:Boolean,
        required:[true,'Please Select Either Like Or Dislike ']
        

    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post',
        required:[true,'Please Select The Post For the Like Or DisLike']
       
        
    
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})


const Likes=mongoose.model('like',likesSchema);


module.exports=Likes;