const express= require("express")
const multer = require("multer")
const sharp = require("sharp")
const User = require("../models/user")
const auth = require("../middlewares/auth")
const router = new express.Router()

router.post("/users",async (req,res)=>{
    const user = new User(req.body)

    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }

    // user.save().then(()=>{
    //     res.status(201).send(user)  
    // }).catch((e)=>{  
    //     res.status(400).send(e)
    // })
})

router.post("/users/login",async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)     //defining our function.. which will be defined in userschema
        const token = await user.generateAuthToken()                     //definig our method... which will be defined in userschema
        res.send({user,token})  //just like writing {user:user, token:token} (shorthand property of objects)
        //whenever we send an object using res.send..the objects gets converted to json.stringify and then it calls toJSON ...so we have explicitly coded toJSON function in models to remove password and tokens
    }catch(e){
        res.status(400).send(e)
    }
})

router.post("/users/logout",auth,async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{     //deleting req.token from tokens array  
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.post("/users/logoutAll",auth,async(req,res)=>{
    try{
        req.user.tokens = []    //clearing the array,, initializing it to empty array
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.get("/users/me",auth,async (req,res)=>{         //auth is the middleware
    res.send(req.user)
})

// router.get("/users/:id",async (req,res)=>{           // we don't need to get other user's profile
//     const _id = req.params.id

//     try{
//         const user = await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }catch(e){
//         res.status(500).send()
//     }
//     // User.findById(_id).then((user)=>{
//     //     if(!user){
//     //         return res.status(404).send()
//     //     }
//     //     res.send(user)
//     // }).catch((e)=>{
//     //     res.status(500).send()
//     // })
// })

router.patch("/users/me",auth,async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name","email","password","age"]
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update)
    }) 

    if(!isValidOperation){
        return res.status(400).send({error:"invalid operation"})
    }

    try{        //req.user is set by auth middleware
        updates.forEach((update)=>{
            req. user[update] = req.body[update]
        })
        await req.user.save()
        // const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete("/users/me",auth,async (req,res)=>{
    try{
        // const user = await User.findByIdAndDelete(req.user._id)     //we got req.user._id from auth
        // if(!user){
        //     return res.status(404).send()
        // }
        
        await req.user.remove()     //mongoose way to remove 
                                    //it is having a auth function in user model in pre method
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

const upload = multer({
    // dest:"avatars",      // we won't be saving files in directory 
    limits:{
        fileSize:1000000    //file size cannot be more than 1mb
    },
    fileFilter(req,file,cb){        //cb is callback
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error("File should be of .jpg or .jpeg or .png format"))
        }
        cb(undefined,true)
    }
})
router.post("/users/me/avatar",auth,upload.single("avatar"),async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({ width:250,height:250 }).png().toBuffer()

    req.user.avatar = buffer //req.file.buffer   //req.user is from auth req.file.buffer is only accessible if no dest is given in multer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.delete("/users/me/avatar",auth,async(req,res)=>{
    req.user.avatar = undefined;
    await req.user.save()
    res.send()
})

router.get("/users/:id/avatar",async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar)
            throw new Error()

        res.set("Content-Type","image/png")
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
})
module.exports = router