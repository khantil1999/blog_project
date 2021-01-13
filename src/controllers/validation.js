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
                        
                    }
                }
                if (k === 'isAlpha' && obj[key][k] === true) {
                    if (!validator.isAlpha(obj[key]['value'])) {
                        errorObj[key] = `only alphabets are allowed`
                        
                    }
                   
                }
                if (k === 'isEmail' && obj[key][k] === true) {
                    if (!validator.isEmail(obj[key]['value'])) {
                        errorObj[key] =`Please Enter Valid Email Address`
                        
                    }
                   
                }

            }
        }
    }

    return errorObj;
   
})

const generateObj = (obj) => {
    const finalObj = {}
    for (let key in obj) {
        finalObj[key] = obj[key]['value'];
    }

    return finalObj;

}



module.exports = {
    checkValidation,
    generateObj

}