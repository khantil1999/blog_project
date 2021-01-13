const router=require('express').Router();
const {createUser}=require('../controllers/user.controller');
// const auth=require('../middlewares/auth.js');

router.post('/register',createUser);




module.exports=router;