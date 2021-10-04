const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Task = require("./task")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
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
    },
    tokens:[{       //storing array of tokens.. so that user may login from many devices and logout from one and stay logged in in another
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true     //enables createdAt and updateAt in database
})

//virtual property is relation between two entities (task and user).. it won't be stored in database
userSchema.virtual("userTasks",{
    ref:"Task",
    localField:"_id",       //_id of user and owner of Task is same here...
    foreignField:"owner"    //name of field in other entity
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id},"thisismynewcourse")

    user.tokens = user.tokens.concat({token:token})
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})    //just like writing{email:email}

    if(!user){
        throw new Error("Unable to login!")
    }

    const isMatch = await bcrypt.compare(password,user.password)    //comparing plain text password with hashed password

    if(!isMatch){
        throw new Error("Unable to login!")
    }

    return user
}

//hash the plain text password before saving
userSchema.pre("save", async function(next){      //pre is middleware doing stuff before save
    const user = this
    // console.log("just before saving")
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})   

userSchema.pre("remove",async function(next){
    const user = this
    await Task.deleteMany({ owner:user._id })
    next()
})

const User = mongoose.model("User",userSchema)

module.exports = User