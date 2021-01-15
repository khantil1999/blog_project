const { checkValidation,generateObj} = require('./validation');
const { Topic ,Post} = require('../models');
const validator = require('validator');
const createTopic=async(req,res,next)=>{
    try {
        const topicObj={
            topicTitle:req.body.title 
        }
        const topic=await new Topic(topicObj).save();
        res.status(201).json({
            message:'Topic Created',
            id:topic._id,
            title:topic.topicTitle
        })
    } catch (error) {
        next(error)
    }

}

const findAll=async(req,res,next)=>{
    const topic=await Topic.find();
    if(!topic)
    {
        return res.status(404).json({
            message:'No Topic Found'
        })
    }
    res.status(200).json(topic);
}

const getPost=async(req,res,next)=>{
    try {
        
        if (!validator.isMongoId(req.params.id)) {
            return res.status(404).json({
                message:'oops no post found releted to this topic!'
            })
        }
        const posts = await Post.find({topicId:req.params.id})
        
       
        if(!posts)
        {
            return res.status(404).json({
                message:'oops no post found releted to this topic!'
            })
        }
        
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
}
module.exports={
    createTopic,
    findAll,
    getPost
}