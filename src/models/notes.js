const mongoose = require("mongoose");

const NotesSchema = mongoose.Schema({
    title : {
        type : String 
    } , 
    content : {
        type : String ,
    }
} , {
    timestamps :  true
})

const NotesModel = mongoose.model("Note" , NotesSchema);


module.exports =  NotesModel;