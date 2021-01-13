const router=require('express').Router();

const User=require('./user.router');
const Topic=require('./topic.router');
const Post=require('./post.router')

router.use('/user',User);
router.use('/topic',Topic)
router.use('/post',Post);


module.exports=router;