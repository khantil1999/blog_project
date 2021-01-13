const { urlencoded } = require('express');
const express=require('express');
require('./db/connection');
const app=express();

app.use(express.json());
app.use(express.urlencoded());


module.exports=app;



