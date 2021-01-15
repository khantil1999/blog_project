const jwt=require('jsonwebtoken');
const {User}=require('../models');


const verifyToken=async(req,res,next)=>{
  try {
    if(!req.header('Authorization'))  
    {
        return res.status(400).json({
            error:'Please Provide Token'
        })
    }
    const token=req.header('Authorization');
    const decodedToken=jwt.verify(token,"KHANTIL")
    
    const user=await User.findOne({_id:decodedToken.id,'tokens.token':token});
    if(!user)
    {
        return res.status(401).json({
            error:"Unauthorized Access"
        });
    }
    req.user=user;
    
    next();
    
  } catch (error) {
        
      next(error)
  }
}

module.exports=verifyToken;