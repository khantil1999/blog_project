const { checkValidation, generateObj } = require('./validation');
const { Comments,Post } = require('../models');
const validator = require('validator');
const createComment=async(req,res,next)=>{
    try {

        if(!validator.isMongoId(req.params.id))
        {
            return res.status(400).json({
                error:'Provide Valid Post Id'
            })
        }
        const post=await Post.findById(req.params.id);
        if(!post)
        {
            return res.status(400).json({
                error: 'Provide Valid Post Id'
            })
        }
        const commentObj={
            description:req.body.description,
            dateTime:new Date(),
            postId:req.params.id,
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