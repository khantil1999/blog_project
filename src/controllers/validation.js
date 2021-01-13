const validator=require('validator');


const checkEmptyValidation=((data)=>{
    const errorObject={}
    for(let key in data)
    {
        if(data[key]==="" ||data[key]===undefined)
        {
            errorObject[key]=`${key} Can Not Be Blank`
        }
    }

    return errorObject;
})


module.exports=checkEmptyValidation