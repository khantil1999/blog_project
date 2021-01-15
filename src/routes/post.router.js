const router=require('express').Router();
const {createPost,updatePost,deletePost,getPostByUser,getAllPost,getMostRecentPost}=require('../controllers/post.controller');
const verifyToken=require('../middlewares/auth');


router.post('/',verifyToken,createPost)
router.put('/:id',verifyToken,updatePost)
router.delete('/:id',verifyToken,deletePost)
router.get('/',verifyToken,getPostByUser);

router.get('/all',getAllPost);
router.get('/all/recent',getMostRecentPost)
module.exports=router;