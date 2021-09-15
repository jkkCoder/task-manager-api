const mongoose = require("mongoose")
const validator = require("validator")

const User = mongoose.model("User",{
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

module.exports = User