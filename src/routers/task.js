const express = require("express")
const Task = require("../models/task")
const auth = require("../middlewares/auth")
const router = new express.Router()

router.post("/tasks",auth,async (req,res)=>{
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,        //copies all the task related thing from req.body
        owner: req.user._id //all tasks are connected to user who created it
    })

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

//GET /tasks?completed=true
//GET /tasks?limit=10&skip=10
//GET /tasks?sortBy=createdAt:desc
router.get("/tasks",auth,async (req,res)=>{
    const match = {}
    let limit = 0
    let skip = 0
    const sort = {}

    if(req.query.completed){
        match.completed = (req.query.completed === "true")
    }
    if(req.query.limit)
        limit = parseInt(req.query.limit)
    if(req.query.skip){
        console.log("skip",skip)
    }
    if(req.query.sortBy)
    {
        const parts = req.query.sortBy.split(":")
        console.log(parts[0],parts)
        sort[parts[0]] = parts[1] ==="desc" ?-1:1
    }
    try{
        await req.user.populate({
            path:"userTasks",
            match:match,
            options:{
                limit:limit,
                skip:skip,
                sort:sort       //1 is asc -1 is desc
            }            
        })
        res.send(req.user.userTasks)
                    //or
        // const tasks = await Task.find({owner:req.user._id})
        // res.send(tasks)
    }catch(e){
        res.status(500).send()
    }
})

router.get("/tasks/:id",auth ,async (req,res)=>{
    const _id= req.params.id
    try{
        const task = await Task.findOne({_id,owner:req.user._id})   //req.user from auth
        //if i'm not the owner or id doens't line up i won't get anything back

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

router.patch("/tasks/:id",auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description","completed"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:"invalid updates"})
    }

    try{
        // const task = await Task.findById(req.params.id)
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id})
        console.log(task)
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update)=>{
            task[update] = req.body[update]
        })
        await task.save()

        // const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete("/tasks/:id",auth,async (req,res)=>{
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router
