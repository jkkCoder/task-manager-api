require("../src/db/mongoose")
const User = require("../src/models/user")

// 614208d52a9aa5717fc436ce

// User.findByIdAndUpdate("614208d52a9aa5717fc436ce",{age:1}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:1})      //promise chaining
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeAndCount = async(id,age)=>{
    const user = await User.findByIdAndUpdate(id,{age:age})
    const count = await User.countDocuments({age:age})
    return count
}

updateAgeAndCount("614208d52a9aa5717fc436ce",2).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})