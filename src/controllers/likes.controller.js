const { Like,Post} = require('../models');
const validator = require('validator');


//this for the like the post
const likePost = async (req, res, next) => {
    try {

        if (!validator.isMongoId(req.params.id)) {
            return res.status(404).json({
                error:'oops no post found'
            })
        }
        const post=await Post.findById(req.params.id);
        if(!post)
        {
            return res.status(404).json({
                error:'oops no post found'
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

//this is for dislike the post
const disLikePost = async (req, res, next) => {
    try {
        if (!validator.isMongoId(req.params.id)) {
            return res.status(404).json({
                error:'oops no post found'
            })
        }
        const post=await Post.findById(req.params.id);
        if(!post)
        {
            return res.status(404).json({
                error:'oops no post found'
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

//this is for the getMostLikePost

const getMostLikePost = async (req, res, next) => {
    try {
      
        const mostLikePosts = await Like.aggregate([
            {
                $match:{"isLike":{$eq:true}}
            },
            {
                $group: {
                    _id: "$postId",
                    likes: { $sum: 1},

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
                $sort:{likes:-1}
            },
            {
                $project:{likes:1,"post":{"postTitle":1,"postDescription":1,"postDate":1}}
            }
        ])
        
        
        res.status(200).json(mostLikePosts);        
    } catch (error) {
        next(error)
    }
}


// get all the likes and dislikes on the post
const getAllLikeDisLikeByPost=async(req,res,next)=>{
    try {
        if (!validator.isMongoId(req.params.id)) {
            return res.status(404).json({
                error:'oops no post found'
            })
        }
        const post=await Post.findById(req.params.id);
        if(!post)
        {
            return res.status(404).json({
                error:'oops no post found'
            })
        }       
        const allData=await Like.find({postId:req.params.id},{postId:0,createdAt:0,updatedAt:0,__v:0,_id:0});
        if(allData.length<=0)
        {
            return res.status(200).json({
                error:'oops no likes or dislikes found on this post'
            })
        }
         res.status(200).json(allData)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    likePost,
    disLikePost,
    getMostLikePost,
    getAllLikeDisLikeByPost
}