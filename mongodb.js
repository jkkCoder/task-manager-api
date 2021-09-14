//CRUD create read update delete

const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectId
//above lines can be written in desturctured format as 
//const {MongoClient, ObjectID} = require("mongodb")

// const id = new ObjectID()
// console.log(id.id.length)
// console.log(id.toHexString().length)
// console.log(id.getTimestamp())

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"

MongoClient.connect(connectionURL, { usenewUrlParser:true},(error, client)=>{
    if(error){
        return console.log("Unable to connect to database")
    }

    // console.log("connected correctly")
    const db = client.db(databaseName)

    // db.collection("users").insertOne({
    //     name:"Jayesh",
    //     age:19
    // },(error, result)=>{       //callback
    //      if(error) {
    //          return console.log("unable to insert user")
    //      }

    //      console.log(result)    //result has only one and only one method ops which shows what datas were inserted. 
    // })

    // db.collection("users").insertMany([
    //     {
    //         name:"golu",
    //         age:19 
    //     },
    //     {
    //         name:"jayesh karn",
    //         age:20 
    //     }
    // ],(error,result)=>{
    //     if(error)
    //         return console.log("unable to insert documents")
        
    //     console.log(result)
    // })
    // db.collection("tasks").insertMany([
    //     {
    //         description:"clean the house",
    //         completed:true 
    //     },{
    //         description: "renew inspection",
    //         completed:false 
    //     },{
    //         description: "pot plants",
    //         completed:false 
    //     }
    // ],(error,result)=>{
    //     if(error)
    //     {
    //         return console.log("unable to insert tasks")
    //     }
    //     console.log(result)
    // })

    // db.collection("users").findOne({_id: new ObjectID("613b30b882824b40006ef9c9")},(error,user)=>{
    //     if(error){
    //         return console.log("unable to fetch")
    //     }

    //     console.log(user)
    // })

    // db.collection("users").find({ age:19 }).toArray((array,users)=>{    //find return cursor object
    //     console.log(users)
    // })

    // db.collection("tasks").findOne({_id:new ObjectID("613b31f18d30c160097b88a6")},(error,task)=>{
    //     if(error){
    //         return console.log("unable to fetch")
    //     }
    //     console.log(task)
    // })

    // db.collection("tasks").find({completed:false}).toArray((error,tasks)=>{
    //     console.log(tasks)
    // })

    // const updatePromise = db.collection("users").updateOne({
    //     _id:new ObjectID("613b30b882824b40006ef9c8")
    // }, {
    //     $set:{
    //         name:"golu kumar"
    //     },
    //     $inc:{      //increments the age by 1
    //         age: 1
    //     }
    // })

    // updatePromise.then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
    
    // db.collection("tasks").updateMany({
    //     completed:false
    // },{
    //     $set:{
    //         completed:true
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log("error", error)
    // })

    // db.collection("users").deleteMany({
    //     age:20
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })  

    // db.collection("tasks").deleteOne({
    //     description: "pot plants"
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((err)=>{
    //     console.log(err)
    // })
})
