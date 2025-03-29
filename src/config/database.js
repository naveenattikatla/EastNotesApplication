const mongoose =  require("mongoose")


const connectDB = async  () =>{
    await mongoose.connect("mongodb+srv://Naveen:Mongodb1729@nodejs.o1lwx.mongodb.net/backend-task")   
}

module.exports = connectDB;



