const router=require('express').Router();

const User=require('./user.router');
const Topic=require('./topic.router');
const Post=require('./post.router')
const Comment=require('./comment.router');
const Like=require('./likes.router');

router.use('/user',User);
router.use('/topic',Topic)
router.use('/post',Post);
router.use('/comment',Comment);
router.use('/like',Like);


module.exports=router;