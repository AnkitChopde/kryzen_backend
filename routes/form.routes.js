const express = require("express");
const { formModel } = require("../models/form.model");
const upload = require("../middlewares/photoUpload.middleware");
const formRoutes = express.Router();

formRoutes.get("/getFormDetails",async(req,res)=>{
try{
   const formDetails = await formModel.find();
   res.status(200).send({data:formDetails,status:"success"})
}
catch (e){
res.status(400).send({msg:e.message})
}
});

formRoutes.post('/addFormDetails',upload.single("photo"),async(req,res)=>{
    try{
       const photoPath = req.file.path;
       console.log(photoPath)
      if( 
        req.body.name &&
        req.body.age &&
        req.body.address &&
        photoPath
       ){
        const newFormDetails = new formModel({
            name:req.body.name,
            age:req.body.age,
            address:req.body.address,
            photo:photoPath
           });

           await newFormDetails.save()
      res.status(200).json({msg: "Form details submitted successfully!"})
       }else{
        res.status(400).json({msg: "Invalid Data Format!"})
       }

       
    }
    catch(e){
      res.status(400).json({msg: "Error while submiting data!"})
    }
});

module.exports = formRoutes