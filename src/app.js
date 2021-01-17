const { urlencoded } = require('express');
const express=require('express');
require('./db/connection');
const routes=require('./routes')
// const multer=require('multer');
// const formData=multer();
// const bodyParser = require('body-parser');
const app=express();

app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended:true}))
// app.use(formData.array());
app.use('',routes);
// app.use(formData.array())

app.use(require('./middlewares/errorHandler'))
module.exports=app;



