const { checkValidation, generateObj } = require('./validation');
const { Comments } = require('../models');

const createComment=async(req,res,next)=>{
    try {
        const commentObj={
            description:req.body.description,
            dateTime:new Date(),
            postId:req.body.postId,
            userId:req.user._id
        }

        const comment=await Comments(commentObj).save();
    
        res.status(201).json({
            message:'Commented Successfullty'
        })
        
    } catch (error) {
        next(error)
    }
}


module.exports={
    createComment
}