const errorHandler = ((err, req, res, next) => {

    // console.log(err)
    if (err.code && err.code === 11000) {
        res.status(400).json({
            error: `${Object.keys(err.keyValue)} has already been taken`
        })
    }
    else if (err.name === 'ValidationError') {

        let errors = Object.values(err.errors).map(el => el.message)
        let fields = Object.values(err.errors).map(el => el.path);
        const errorObject = {}
        for (let i = 0; i < errors.length; i++) {
            errorObject[fields[i]] = errors[i];
        }
        res.status(400).json(errorObject)

    }
    else if(err.name==='JsonWebTokenError')
    {
        res.status(401).json({
            error: 'Unauthorized Access'
        })
    }
    else if(err.name==='Error'){
        res.status(400).json({
            error:err.message
        })
    }
    else if(err.code==='LIMIT_FILE_SIZE'){
        res.status(400).json({
            error:'Image Size Can Not Be Grater Then 2MB'
        })
    }
    else if(err.name==='MulterError') {
        res.status(401).json({
            error:err.message
        })
    }
    else
    {
        res.send("ERROR")
    }


})

module.exports = errorHandler;