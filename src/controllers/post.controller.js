const { checkValidation, generateObj } = require('./validation');
const { Post } = require('../models');
const validator = require('validator');
const { find } = require('../models/user.model');



const createPost = async (req, res, next) => {
    try {
        
        if (!validator.isMongoId(req.body.topicId)) {
            return res.status(404).json({
                message: 'Please Provide Valid Topic Id'
            })
        }
        const postObj = {
            postTitle: req.body.postTitle,
            postDescription: req.body.postDescription,
            postDate: new Date(),
            topicId: req.body.topicId,
            userId: req.user._id
        }
        const post = await Post(postObj).save();
        res.status(201).json({
            message:"Post Created Successfully",
            postId:post._id,
            postTitle:post.postTitle,
            postDescription:post.postDescription,
            postDate:post.postDate
        })
    } catch (error) {
        next(error);
    }

}

const updatePost = async (req, res, next) => {
    try {
        if (!validator.isMongoId(req.params.id)) {
            return res.status(404).json({
                message: 'oops post is not found'
            })
        }
        const keys = Object.keys(req.body);
        const updateAllowed = ['postTitle', 'postDescription', 'topicId']

        const post = await Post.findOne({ _id: req.params.id, userId: req.user._id })
        if (!post) {
            return res.status(404).json({
                message: 'oops no posts found'
            })
        }
        updateAllowed.forEach(el => {
            post[el] = req.body[el] || post[el];
        })

        const newPost = await post.save();
        await newPost.populate({
            path: 'topicId',
            select: '-_id -__v -createdAt -updatedAt'
        }).execPopulate()
        res.status(200).json(newPost);

    } catch (error) {
        next(error)
    }
}

const deletePost = async (req, res, next) => {
    try {
        if (!validator.isMongoId(req.params.id)) {
            return res.status(404).json({
                message: 'oops no posts found'
            })
        }
        const post = await Post.findOne({ _id: req.params.id, userId: req.user._id })
        if (!post) {
            return res.status(404).json({
                message: 'oops no posts found'
            })
        }
        await post.remove();
        res.status(200).json({
            message: 'Post Deleted Successfully'
        })
    } catch (error) {
        next(error)
    }
}

const getPostByUser = async (req, res, next) => {
    try {
        const posts = await Post.find({ userId: req.user._id },{createdAt:0,updatedAt:0,__v:0,userId:0})
        
        if (posts.length<=0) {
            return res.status(404).json({
                message: 'oops no posts found'
            })
        }
        for(let i=0;i<posts.length;i++)
        {
            await posts[i].populate({
                path:'topicId',
                select: '-_id -__v -createdAt -updatedAt -userId'
            }).execPopulate();
        }
        res.status(200).json(posts);

    } catch (error) {
        next(error)
    }
}
const getAllPost=async(req,res,next)=>{
    try {
        const posts=await Post.find({},{createdAt:0,updatedAt:0,__v:0})
        if (!posts) {
            return res.status(404).json({
                message: 'oops no posts found'
            })
        }
        for(let i=0;i<posts.length;i++)
        {
            
            await posts[i].populate({
                path:'topicId',
                select: '-_id -__v -createdAt -updatedAt -userId'
            }).execPopulate();
        }
        
        res.status(200).json(posts);
    } catch (error) {
        next(error)
    }
}


const getMostRecentPost=async(req,res,next)=>{
    try {
        const posts=await Post.find({},{createdAt:0,updatedAt:0,__v:0,userId:0}).sort({postDate:-1});
        if (!posts) {
            return res.status(404).json({
                message: 'oops no posts found'
            })
        }
        for(let i=0;i<posts.length;i++)
        {
            await posts[i].populate({
                path:'topicId',
                select: '-_id -__v -createdAt -updatedAt -userId'
            }).execPopulate();
        }
        
        res.status(200).json(posts);
    } catch (error) {
        next(error)
    }
}
module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPostByUser,
    getAllPost,
    getMostRecentPost
}