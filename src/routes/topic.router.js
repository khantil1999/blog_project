const router=require('express').Router();
const {createTopic,findAll,getPost}=require('../controllers/topic.controller');
const verifyToken=require('../middlewares/auth');
router.post('/',verifyToken,createTopic);
router.get('/',findAll);
router.get('/posts/:id',getPost);

module.exports=router