const validator = require('validator');


const checkValidation = ((obj) => {
    let errorObj = {};
    for (let key in obj) {
        if (typeof (obj[key]) === 'object') {
         
            for (let k in obj[key]) {
                // errorObj[key]='';
                if (k === 'isEmpty' && obj[key][k] === true) {
                    if (validator.isEmpty(obj[key]['value'])) {
                        errorObj[key]= `${key} can not be blank`
                        break;
                    }
                }
                if (k === 'isAlpha' && obj[key][k] === true) {
                    if (!validator.isAlpha(obj[key]['value'])) {
                        errorObj[key] = `only alphabets are allowed`
                        break;
                    }
                   
                }
                if (k === 'isEmail' && obj[key][k] === true) {
                    if (!validator.isEmail(obj[key]['value'])) {
                        errorObj[key] =`Please Enter Valid Email Address`
                        break;
                    }
                   
                }

            }
        }
    }
    
   
})





module.exports = checkValidation