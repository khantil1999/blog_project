const mongoose = require('mongoose');
const bcryptjs=require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true 
        

    },
    password: {
        type: String,
        required: true
        
    },
    tokens: [{
        token: {
            type:String          
        }
    }]
})

userSchema.methods.toJSON=function(){
    const user=this.toObject();
    delete user.password
    delete user.__v
    delete user.tokens
    
    return user;
}

userSchema.pre('save',async function(next){
    if(this.isModified('password'))
    {
        this.password=await bcryptjs.hash(this.password,10);
    }
})


const User=mongoose.model('user',userSchema);



module.exports=User;