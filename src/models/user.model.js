const mongoose = require('mongoose');
const bcryptjs=require('bcryptjs');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name Can Not Be Blank'],
        trim:true,
        validate:(value)=>{
            if(!value.match(/^[A-Za-z ]+$/))
            {
                throw new Error('Name Contains Only Characters And White Space')
            }
        }
    },
    email: {
        type: String,
        required: [true,'Email Can Not Be Blank'],
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
        required: [true,'Password Can Not Be Blank'],
        validate:(value)=>{
            // console.log(validator.isStrongPassword(value,{minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}))
            if(!validator.isStrongPassword(value,{minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}))
            {
                throw new Error("Password Must Be More Then 8 Characters Long And At Least Contain One Upper Latter,One Number And One Special Characters(.,#,$,%)")
            }
        }
        
    },
    tokens: [{
        token: {
            type:String          
        }
    }]
},{timestamps:true})

userSchema.methods.toJSON=function(){
    const user=this.toObject();
    delete user.password
    delete user.__v
    delete user.tokens
    delete user.createdAt
    delete user.updatedAt
    
    return user;
}

userSchema.pre('save',async function(next){
    if(this.isModified('password'))
    {
        this.password=await bcryptjs.hash(this.password,10);
    }
    next()
})


const User=mongoose.model('user',userSchema);



module.exports=User;