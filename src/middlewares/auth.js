const jwt=require('jsonwebtoken');
const {User}=require('../models');


const verifyToken=async(req,res,next)=>{
    // if(!req.query.token || !req.header('Authorization'))
    // {
    //     return res.status(400).send("token is required");
    // }
    const token=req.header('Authorization');
    const decodedToken=jwt.verify(token,"khantil")
    
    const user=await User.findOne({_id:decodedToken.id,'tokens.token':token});
    if(!user)
    {
        return res.status(401).send("Unauthorized request");
    }
    req.user=user;
    
    next();
    
}

module.exports=verifyToken;