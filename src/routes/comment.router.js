const router=require('express').Router();
const { verify } = require('jsonwebtoken');
const {createComment,deleteComment}=require('../controllers/comment.controller');
const verifyToken=require('../middlewares/auth');



router.post('/:id',verifyToken,createComment);
router.delete('/:id',verifyToken,deleteComment)

module.exports=router