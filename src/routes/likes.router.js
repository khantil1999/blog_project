const router=require('express').Router();
const {likePost,disLikePost,getMostLikePost}=require('../controllers/likes.controller');
const verifyToken=require('../middlewares/auth');

router.post('/likePost/:id',verifyToken,likePost);
router.post('/disLikePost/:id',verifyToken,disLikePost);

router.get('/mostLikePost',getMostLikePost)
module.exports=router