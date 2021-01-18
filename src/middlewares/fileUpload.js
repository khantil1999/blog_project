const multer = require('multer');


const fileFilter = (req, file, callback) => {
    const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    if (allowedFileTypes.indexOf(file.mimetype.toLowerCase()) === -1) {
        return callback(new Error('Only Images Are Allowed[png,jpeg,jpg]'), false)
    }
    
    let index = file.mimetype.lastIndexOf('/');
    let fileType = file.mimetype.substring(index + 1);
    let fileName = "post_" + new Date().getTime() + "." + fileType;
    req.fileName = fileName;
    callback(undefined, true)

}

const uploadFile = multer({
    storage: multer.memoryStorage(),
    fileFilter: fileFilter,
    limits:{
        fileSize:2000000
    }
   
}).single('file')


// const uploadFile = (req, res, next) => {
//     upload(req, res, err => {
//         if (err) {
//             next(err);
//         }
//         next()
//     })
// }


module.exports = {
    uploadFile,
}