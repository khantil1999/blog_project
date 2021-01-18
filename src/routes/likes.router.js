const router=require('express').Router();
const {likePost,disLikePost,getMostLikePost,getAllLikeDisLikeByPost}=require('../controllers/likes.controller');
const verifyToken=require('../middlewares/auth');

router.post('/likePost/:id',verifyToken,likePost);
router.post('/disLikePost/:id',verifyToken,disLikePost);

router.get('/mostLikePost',getMostLikePost)

router.get('/post/:id/all',getAllLikeDisLikeByPost);
module.exports=router