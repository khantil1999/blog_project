const mongoose=require('mongoose');
const Comments=require('./comments.model')
const Like=require('./likes.model')
const Topic=require('./topic.model');

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
        required:[true,'Topic Can Not Be Blank'],
        validate:async(value)=>{
            const data=await Topic.findById(value);
            if(!data)
            {
                throw new Error("No Topic Found");
            }
        }
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
    
})


postSchema.pre('remove',async function(next){
  
    await Comments.deleteMany({postId:this._id});
    await Like.deleteMany({postId:this._id});
    next()
})

const Post=mongoose.model('post',postSchema);


module.exports=Post