const mongoose = require('mongoose');
const bcryptjs=require('bcryptjs');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name Can Not Be Blank'],
        trim:true,
    },
    email: {
        type: String,
        required: [true,'Email Can NOt Be Blank'],
        trim: true,
        unique: true,
        validate:(value)=>{
            if (!validator.isEmail(value)) {
                throw new Error('Please Provide Valid Email Address')
                
            }
        }

    },
    password: {
        type: String,
        required: [true,'Password Can NOt Be Blank'],
        minlength:[6,'Password Must Be Grater Then 6 Charactr']
        
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