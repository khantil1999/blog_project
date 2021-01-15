const { checkValidation, generateObj } = require('./validation');
const { Like,Post} = require('../models');
const validator = require('validator');

const likePost = async (req, res, next) => {
    try {

        if (!validator.isMongoId(req.params.id)) {
            return res.status(400).json({
                error: 'Provide Valid Post Id'
            })
        }
        const post=await Post.findById(req.params.id);
        if(!post)
        {
            return res.status(400).json({
                error: 'Provide Valid Post Id'
            })
        }
        const data = await Like.findOne({ postId: req.params.id, userId: req.user._id })
        if (!data) {
            const likeObj = {
                isLike: true,
                postId: req.params.id,
                userId: req.user._id
            }

            const like = await new Like(likeObj).save();
            return res.status(200).json({
                message: 'Successfully Done'
            })
        }
        else if (data.isLike === false) {
            data.isLike = true
            await data.save();
            return res.status(200).json({
                message: 'Successfully Done'
            })

        }
        else if(data.isLike===true)
        {
            await data.remove();
            res.status(200).json({
                message: 'Successfully Done'
            })
        }
        

    } catch (error) {
        next(error)
    }
}


const disLikePost = async (req, res, next) => {
    try {
        if (!validator.isMongoId(req.params.id)) {
            return res.status(400).json({
                error: 'Provide Valid Post Id'
            })
        }
        const post=await Post.findById(req.params.id);
        if(!post)
        {
            return res.status(400).json({
                error: 'Provide Valid Post Id'
            })
        }
        const data = await Like.findOne({ postId: req.params.id, userId: req.user._id })
        if (!data) {
            const likeObj = {
                isLike: false,
                postId: req.params.id,
                userId: req.user._id
            }

            const like = await new Like(likeObj).save();
            return res.status(200).json({
                message: 'Successfully Done'
            })
        }
        else if (data.isLike === true) {
            data.isLike = false
            await data.save();
            return res.status(200).json({
                message: 'Successfully Done'
            })

        }
        else if(data.isLike===false)
        {
            await data.remove();
            res.status(200).json({
                message: 'Successfully Done'
            })
        }
    } catch (error) {
        next(error);
    }
}



const getMostLikePost = async (req, res, next) => {
    try {
      
        const mostLikePosts = await Like.aggregate([
            {
                $match:{"isLike":{$eq:true}}
            },
            {
                $group: {
                    _id: "$postId",
                    count: { $sum: 1},

                }
            },
            { 
                $lookup:{
                    from:'posts',
                    localField: "_id",
                    foreignField: "_id",
                    as: "post"
                }
            
            },
            {
                $sort:{count:-1}
            },
            {
                $project:{count:1,"post":{"postTitle":1,"postDescription":1,"postDate":1}}
            }
        ])
        
        
        res.status(200).json(mostLikePosts);        
    } catch (error) {
        next(error)
    }
}
module.exports = {
    likePost,
    disLikePost,
    getMostLikePost
}