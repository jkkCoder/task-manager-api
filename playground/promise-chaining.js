require("../src/db/mongoose")
const User = require("../src/models/user")

// 614208d52a9aa5717fc436ce

User.findByIdAndUpdate("614208d52a9aa5717fc436ce",{age:1}).then((user)=>{
    console.log(user)
    return User.countDocuments({age:1})      //promise chaining
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})