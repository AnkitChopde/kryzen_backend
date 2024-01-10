const express = require("express");
const { userModel } = require("../models/user.model");
const bcrypt = require("bcrypt")
const userRoutes = express.Router();
const jwt = require("jsonwebtoken")

userRoutes.post("/register",async(req,res)=>{
    const {username,password} = req.body;
    try{
      if(req.body.username && req.body.password){
        const preCheck = await userModel.findOne({username})
        if(!preCheck) {
            const hashedPassword = await bcrypt.hash(password,5)
            const newUser = new userModel({...req.body,password:hashedPassword})
            await newUser.save();
            res.status(200).send({msg: "User has been Registered!", status: "success"})
        }else{
            res.status(400).send({msg: "User already registered!"})
        }
      }else{
        res.status(400).send({msg : "Invalid data format!"})
      }
    }
    catch (e){
      res.status(400).send({msg:e.message})
    }
});

userRoutes.post("/login",async (req,res)=>{
    const {username,password} = req.body;
    try{
        if(username && password){
          const preCheck = await userModel.findOne({username})
          if(preCheck){
            const hashCheck = await bcrypt.compare(password,preCheck.password);
            const token =  jwt.sign({"userId":preCheck._id},"kryzen",{expiresIn:"7d"})
            
            if(hashCheck){
              res.status(200).send({msg:"User logged in Successful!", status:"success",token})
            }else{
              res.status(400).send({msg:"Invalid password"})
            }
          }else{
            res.status(400).send({msg:"User Not Found"})
          }
        }else{
          res.status(400).send({msg:"Invalid data format"})
        }
    }
    catch(e){
      res.status(400).send({msg:e.message})
    }
})

module.exports = {userRoutes}