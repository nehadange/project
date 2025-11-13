const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/crudprj')
.then(()=>{
  console.log("mongoose is connected")
})
.catch((err)=>{
    console.log("err",err)
})


app.use("/api/submit",userRoutes);

//server
app.listen(3000,()=>{
    console.log("server is connected");
})