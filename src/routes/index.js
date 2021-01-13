const router=require('express').Router();

const User=require('./user');

router.use('/user',User);
router.get('/',(req,res)=>{
    res.render('index');
})

module.exports=router;