const router=require('express').Router();

const {createComment,deleteComment,getCommentByPost}=require('../controllers/comment.controller');
const verifyToken=require('../middlewares/auth');



router.post('/post/:id',verifyToken,createComment);
router.delete('/:id',verifyToken,deleteComment);
router.get('/post/:id',getCommentByPost);

module.exports=router