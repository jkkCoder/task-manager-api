const express = require("express")
require("./db/mongoose")    //ensure that file runs and connects to mongodb
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())     //it's gonna automatically pass incoming json to object so we can access it in our request handlers

app.use(userRouter)
app.use(taskRouter)

//this is how to use route

// const router = new express.Router()
// router.get("/test",(req,res)=>{
//     res.send("this is to test express.router")
// })
// app.use(router)


app.listen(port,()=>{
    console.log("server is up on port",port)
})