const router=require('express').Router();
const {likePost}=require('../controllers/likes.controller');
const verifyToken=require('../middlewares/auth');

router.post('/likePost',verifyToken,likePost);



module.exports=router