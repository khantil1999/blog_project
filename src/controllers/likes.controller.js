const { checkValidation, generateObj } = require('./validation');
const { Like } = require('../models');
const validator = require('validator');

const likePost=async(req,res,next)=>{
    try {
        
        if(!validator.isMongoId(req.body.postId))
        {
            return res.status(400).json({
                error:'Provide Valid Id'
            })
        }
        const data=await Like.findOne({postId:req.body.postId,userId:req.user._id})
        if(!data)
        {
            const likeObj={
                isLike:req.body.like.toLowerCase(),
                postId:req.body.postId,
                userId:req.user._id
            }
            
            const like=await new Like(likeObj).save();
            res.status(201).json({
                message:'Successfully Done'
            })
        }
        else{
            if(data.isLike==='true' && req.body.like.toLowerCase()==='false')
            {
                data.isLike='false'
                await data.save()
            }
            else if(data.isLike==='false' && req.body.like.toLowerCase()==='true')
            {
                data.isLike='true'
                await data.save()
            }
            else if((data.isLike==='false' && req.body.like.toLowerCase()==='true') || (data.isLike==='false' && req.body.like.toLowerCase()==='false'))
            {
                
            }
        }
        
    } catch (error) {
        next(error)
    }
}


module.exports={
    likePost
}