const router=require('express').Router();
const {createPost,updatePost,deletePost,getPostByUser,getAllPost,getMostRecentPost,getPostImage}=require('../controllers/post.controller');
const verifyToken=require('../middlewares/auth');
const {uploadFile}=require('../middlewares/fileUpload')


router.post('/',verifyToken,uploadFile,createPost)
router.put('/:id',verifyToken,uploadFile,updatePost)
router.delete('/:id',verifyToken,deletePost)
router.get('/',verifyToken,getPostByUser);
router.get('/all',getAllPost);
router.get('/all/recent',getMostRecentPost)
router.get('/:id/image',getPostImage);
module.exports=router;