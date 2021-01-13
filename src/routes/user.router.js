const router=require('express').Router();
const {createUser,login}=require('../controllers/user.controller');
// const auth=require('../middlewares/auth.js');

router.post('/register',createUser);

router.post('/login',login)


module.exports=router;