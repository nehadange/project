const express = require('express');
const route  = express.Router();
const userModel = require('../models/userModels');

//CREAT
route.post('/',async (req,res)=>{
     let{name , email , password} = req.body
    const userCreate = await userModel.create({
            name ,
            email,
            password
    })
    res.json(userCreate)
})

//READ
route.get('/',async (req,res)=>{
    const readUser = await userModel.find()
    res.json(readUser);
})

//UPDATE
route.put('/:id', async (req, res)=>{
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json(updatedUser);
})

//DELETE
route.delete('/:id',async (req,res)=>{
    const deletedUser = await userModel.findByIdAndDelete(req.params.id)
    res.json({msg:"user is deleted"})
})

module.exports = route