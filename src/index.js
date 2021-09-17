const express = require("express")
require("./db/mongoose")    //ensure that file runs and connects to mongodb
const User = require("./models/user")
const Task = require("./models/task")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())     //it's gonna automatically pass incoming json to object so we can access it in our request handlers

app.post("/users",async (req,res)=>{
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }

    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((e)=>{  
    //     res.status(400).send(e)
    // })
})

app.get("/users",async (req,res)=>{
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send()
    }
    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})

app.get("/users/:id",async (req,res)=>{
    const _id = req.params.id

    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
    // User.findById(_id).then((user)=>{
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})

app.patch("/users/:id",async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name","email","password","age"]
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    }) 

    if(!isValidOperation){
        return res.status(400).send({error:"invalid operation"})
    }

    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        
        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

app.post("/tasks",async (req,res)=>{
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
    // task.save().then(()=>{
    //     res.status(201).send(task)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})

app.get("/tasks",async (req,res)=>{

    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }catch(e){
        res.status(500).send()
    }
    // Task.find({}).then((tasks)=>{
    //     res.send(tasks)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})

app.get("/tasks/:id",async (req,res)=>{
    const _id= req.params.id
    try{
        const task = await Task.findById(_id)
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //         res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})

app.patch("/tasks/:id",async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description","completed"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:"invalid updates"})
    }

    try{
        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

app.listen(port,()=>{
    console.log("server is up on port",port)
})