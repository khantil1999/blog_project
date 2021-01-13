const { checkValidation,generateObj} = require('./validation');
const { Topic } = require('../models');

const createTopic=async(req,res,next)=>{
    try {
        const topicObj={
            topicTitle:{isEmpty:true,value:req.body.title || ''}
        }
    
        const data=checkValidation(topicObj);
        if(Object.keys(data).length!==0)
        {
            return res.status(400).json({'error':data})
        }
        const topic=await new Topic(generateObj(topicObj)).save();
        res.status(201).json({
            message:'Topic Created',
            id:topic._id
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
        const topic = await Topic.findById(req.params.id);
        // console.log(topic);
        await topic.populate({
            path:'posts'
        }).execPopulate();
        if(!topic)
        {
            return res.status(404).json({
                message:'oops no post found releted to this topic!'
            })
        }
        res.status(200).json(topic)
    } catch (error) {
        next(error)
    }
}
module.exports={
    createTopic,
    findAll,
    getPost
}