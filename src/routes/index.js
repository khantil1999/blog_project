const router=require('express').Router();

const User=require('./user.router');

router.use('/user',User);


module.exports=router;