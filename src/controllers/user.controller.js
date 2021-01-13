const checkValidation = require('./validation');
const { User } = require('../models');

const generateObj = (obj) => {
    const finalObj = {}
    for (let key in obj) {
        finalObj[key] = obj[key]['value'];
    }
    
    return finalObj;

}



const createUser = async (req, res, next) => {
    try {
        const userObj = {
            name: { isAlpha: true, isEmpty: true, value: req.body.name },
            email: { isEmail: true, isEmpty: true, value: req.body.email },
            password: {value:req.body.password}
        }
        const data = checkValidation(userObj);
        if(Object.keys(data).length !== 0)
        {
            return  res.status(400).json(data);
        }
        const user=await new User(generateObj(userObj)).save()

    } catch (error) {
        
    }
    
    
    
    


}


module.exports = {
    createUser
}