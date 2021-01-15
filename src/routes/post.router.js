const router=require('express').Router();
const {createPost,updatePost,deletePost,getPostByUser,getPostByTopic,getAllPost}=require('../controllers/post.controller');
const verifyToken=require('../middlewares/auth');


router.post('/',verifyToken,createPost)
router.put('/:id',verifyToken,updatePost)
router.delete('/:id',verifyToken,deletePost)
router.get('/',verifyToken,getPostByUser);
router.get('/topic/:id',verifyToken,getPostByTopic)
router.get('/all',getAllPost);

module.exports=router;