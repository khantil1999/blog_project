const { Comments,Post } = require('../models');
const validator = require('validator');

//this is for the creating the comments
const createComment=async(req,res,next)=>{
    try {

        if(!validator.isMongoId(req.params.id))
        {
            return res.status(404).json({
                error:'oops no post found'
            })
        }
        const post=await Post.findById(req.params.id);
        if(!post)
        {
            return res.status(404).json({
                error: 'oops no post found'
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

//this is for the deleteing the comments

const deleteComment=async(req,res,next)=>{
    try {
        if(!validator.isMongoId(req.params.id))
        {
            return res.status(400).json({
                error:'No Comment Found '
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

//get all the comments on the post
const getCommentByPost=async(req,res,next)=>{
    try {
        if(!validator.isMongoId(req.params.id))
        {
            return res.status(404).json({
                error:'oops no comments found on this post'
            })
        }
        const post=await Post.findById(req.params.id);
        if(!post)
        {
            return res.status(404).json({
                error:'oops no comments found on this post'
            })
        }
        const comments=await Comments.find({postId:req.params.id},{createdAt:0,updatedAt:0,__v:0});
        if(comments.length<=0)
        {
            return res.status(200).json({
                message: 'Oops No Comments Found On This Post!'
            })
        }
        for(let i=0;i<comments.length;i++)
        {
            await comments[i].populate([
                {
                path:'postId',
                select:'-_id -__v -userId -topicId -createdAt -updatedAt -postImage'
               },
               {
                path:'userId',
                select:'-_id -__v  -email -createdAt -updatedAt '
               }
        ]).execPopulate();
        }
        res.status(200).json(comments);

    } catch (error) {
        next(error);
    }
}


module.exports={
    createComment,
    deleteComment,
    getCommentByPost
}