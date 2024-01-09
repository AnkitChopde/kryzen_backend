const express = require("express");
const { connection } = require("./configs/db");
const { userRoutes } = require("./routes/user.routes");
const cors = require("cors")
require("dotenv").config()
const app = express();
app.use(express.json())
app.use(cors())

app.use("/user",userRoutes)

app.listen(process.env.port,async()=>{
   try{
      await connection
      console.log("Database connection established!")
   }
   catch(err){
     console.log(err.message)
   }
   console.log(`Server is live at port ${process.env.port}`)
})