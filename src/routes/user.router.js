const router=require('express').Router();
const {createUser,login,logOut}=require('../controllers/user.controller');
const verifyToken=require('../middlewares/auth.js');

router.post('/register',createUser);

router.post('/login',login)

router.post('/logout',verifyToken,logOut)

module.exports=router;