const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    postTitle:{
        type:String,
        trim:true,
        required:[true,'Post Title Is Required']
    },
    postDescription:{
        type:String,
        trim:true,
        required:[true,'Post Description Is Required'],
        minlength:[10,'At Least Contain Ten Or More Character']
    },
    postImage:{
        type:String,
    },
    postDate:{
        type:Date,
        required:[true,'Post Date Is Required']
    },
    topicId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'topic',
        required:[true,'Topic Can Not Be Blank']
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
    
})


const Post=mongoose.model('post',postSchema);


module.exports=Post