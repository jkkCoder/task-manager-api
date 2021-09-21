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

const bcrypt = require("bcryptjs")

// const myFunction = async ()=>{
//     const password = "Red12345"
//     const hashedPassword = await bcrypt.hash(password,8)

//     console.log(password)
//     console.log(hashedPassword)

//     //to check while loggin in plain text password matches with hashed pass
//     const isMatch = await bcrypt.compare("Red12345",hashedPassword)
//     console.log(isMatch)
// }

const jwt = require("jsonwebtoken")

const myFunction = async ()=>{
    const token = jwt.sign({ _id:"abc123" },"thisismynewcourse",{expiresIn:"1 seconds"})    //passing object as first arg,,and 2nd passing any series of characters
    console.log(token)

    const data = jwt.verify(token,"thisismynewcourse")
    console.log(data)
}

myFunction()