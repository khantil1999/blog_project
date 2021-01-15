const { User } = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');




const createUser = async (req, res, next) => {
    try {
        const userObj = {
            name: req.body.name,
            email:req.body.email ,
            password:req.body.password
        }
        
        const user = await new User(userObj).save();

        res.status(201).json({
            message: "Register Successfully"
        })

    } catch (err) {
        next(err);
    }

}
const login = async (req, res, next) => {
    try {

        if(!req.body.email || !req.body.password)
        {
            return res.status(400).json({
                error: 'Email Address Or Password Are Can No Be Blank'
            })
        }
        // if(validator.isEmpty(req.body.password))
        // {
        //     return res.status(401).json({
        //         error: 'Password Is Can No Be Blank'
        //     })
        // }
        

        const user = await User.findOne({ email: req.body.email });
        if (!user || !bcryptjs.compareSync(req.body.password, user.password)) {
            return res.status(404).json({
                error: 'These Credentials Do Not Match Our Records.'
            })
        }
        const token=jwt.sign({id:user._id},'KHANTIL');
        user.tokens=user.tokens.concat({token})
        await user.save();

        res.status(200).json({
            message:'Login Successfully',
            id:user._id,
            token
        })
        


    } catch (error) {
        next(error);
    }
}

module.exports = {
    createUser,
    login
}