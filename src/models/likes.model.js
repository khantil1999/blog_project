const mongoose=require('mongoose');
const validator = require('validator');
const likesSchema=new mongoose.Schema({
    isLike:{
        type:String,
        required:[true,'Please Select Either Like Or Dislike '],
        validate:(value)=>{
            
            
            if(!value.trim().toLowerCase()==='true' || !value.trim().toLowerCase()==='false')
            {   
                throw new Error('Value Must Be Either True Or False');
            }
        }
        

    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post',
        required:[true,'Please Select The Post For the Like Or DisLike'],
        validate:(value)=>{
            if(!mongoose.isValidObjectId(value))
            {
                throw new Error('Please Provide Valid Post Id');
            }
        }

    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})


const Likes=mongoose.model('like',likesSchema);


module.exports=Likes;