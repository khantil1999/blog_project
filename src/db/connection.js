const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1/blog-db',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((msg)=>{
    console.log('Connection is successfully')
}).catch((error)=>{
    console.log("Unable To Connect To The Database:",error.message);
})