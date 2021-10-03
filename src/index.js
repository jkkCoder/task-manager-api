const express = require("express")
require("./db/mongoose")    //ensure that file runs and connects to mongodb
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")

const app = express()
const port = process.env.PORT || 3000

//this is how to upload a file
const multer = require("multer")
const upload = multer({
    dest:"images",       //folder where file will get saved
    limits:{
        fileSize:1000000     //file cannot be more 1million bytes that is 1 mega bytes.
    },
    fileFilter(req,file,cb){    //cb is callback
        if(!file.originalname.match(/\.(doc|docx)$/)){    //file.original name has the file name on user's system
                                                            //.match takes regular expression
            return cb(new Error("please upload a PDF"))
        }

        cb(undefined,true)
    }
})
app.post("/upload",upload.single("upload"),(req,res)=>{     //upload in upload.single is key passed with value as image
    res.send()
})

//middleware
// app.use((req,res,next)=>{
//     console.log(req.method,req.path)
//     if(req.method === "GET"){
//         res.send("GET requests are disabled")
//     }else{
//         next()
//     }
// })

// app.use((req,res,next)=>{            //maitenance middleware
//     res.status(503).send("site is currently down. check back soon")
// })

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

// const myFunction = async ()=>{
//     const token = jwt.sign({ _id:"abc123" },"thisismynewcourse",{expiresIn:"7 days"})    //passing object as first arg,,and 2nd passing any series of characters,,and 3rd arg object of expiresIn
//     console.log(token)

//     const data = jwt.verify(token,"thisismynewcourse")
//     console.log(data)
// }

// myFunction()

const Task = require("./models/task")
const User = require("./models/user")

// const main = async () =>{
//     // const task = await Task.findById( "614f0d78446f2b0f8b4426b9")
//     // await task.populate("owner")            //it's gonna find the user who's associated with the task and task.owner now be the profile itself .
//     //                                          //we can populate because of ref:User given in task model
//     // console.log(task.owner)
//     const user = await User.findById("614f0d4a446f2b0f8b4426b0")
//     await user.populate("userTasks")
//     console.log(user.userTasks)
// }

// main()