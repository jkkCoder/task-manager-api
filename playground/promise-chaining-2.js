require("../src/db/mongoose")
const Task = require("../src/models/task")

// 6140971acd8fdd4e8013d82f

Task.findByIdAndDelete("6140971acd8fdd4e8013d82f").then((user)=>{
    console.log(user)
    return Task.find({comleted:false})
}).then((tasks)=>{
    console.log(tasks)
}).catch((e)=>{
    console.log(e)
})