
const { Topic ,Post} = require('../models');
const validator = require('validator');

//this is use for creating the topic 
const createTopic=async(req,res,next)=>{
    try {
        const topicObj={
            topicTitle:req.body.topicTitle,
            userId:req.user._id
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

//get all the topic
const findAll=async(req,res,next)=>{
    const topic=await Topic.find({},{"__v":0,createdAt:0,updatedAt:0});
    if(!topic)
    {
        return res.status(404).json({
            message:'No Topic Found'
        })
    }
    res.status(200).json(topic);
}


//get all post by the topic
const getPost=async(req,res,next)=>{
    try {
        
        if (!validator.isMongoId(req.params.id)) {
            return res.status(404).json({
                message:'oops no post found releted to this topic!'
            })
        }
        const posts = await Post.find({topicId:req.params.id})
        
       
        if(posts.length <=0)
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