const router=require('express').Router();
const {createUser,login,updateProfile,uploadImage,sharpImage}=require('../controllers/user');
const auth=require('../middlewares/auth.js');
router.get('/registration',(req,res)=>{
    res.render("users/registration");
})
router.get('/login',(req,res)=>{
    res.render('users/login')
})
router.get('/profile',(req,res)=>{
    res.render('users/profile')
})
router.post('/profile',auth,uploadImage,sharpImage,updateProfile);
router.post('/create',createUser);
router.post('/login',login)



module.exports=router;