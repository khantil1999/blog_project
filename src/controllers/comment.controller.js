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

const deleteComment=async(req,res,next)=>{
    try {
        if(!validator.isMongoId(req.params.id))
        {
            return res.status(400).json({
                error:'Provide Valid  Id'
            })
        }
        const comment=await Comments.findOne({_id:req.params.id,userId:req.user._id});

        if(!comment)
        {
            return res.status(404).json({
                error:'No Comment Found '
            })
        }
        await comment.remove();
        res.status(200).json({
            message:"Comment Deleted Successfully"
        })
        
    } catch (error) {
        next(error)
    }
}

module.exports={
    createComment,
    deleteComment
}