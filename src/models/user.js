const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){        //custom validator
            if(value<0){
                throw new Error("Age must be a positive number")
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(value.length<7){
                throw new Error("Password length too short")
            }
            if(value.toLowerCase().includes("password")){
                throw new Error("password cannot contain `password`")
            }
        }
    }
})

userSchema.pre("save", async function(next){      //pre is middleware doing stuff before save
    const user = this
    // console.log("just before saving")
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})          

const User = mongoose.model("User",userSchema)

module.exports = User