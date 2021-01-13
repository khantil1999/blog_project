const { urlencoded } = require('express');
const express=require('express');
require('./db/connection');
const app=express();
const routes=require('./routes')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('',routes);

app.use(require('./middlewares/errorHandler'))
module.exports=app;



