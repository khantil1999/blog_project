const router=require('express').Router();
const {createComment}=require('../controllers/comment.controller');
const verifyToken=require('../middlewares/auth');



router.post('/',verifyToken,createComment);

module.exports=router