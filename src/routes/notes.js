const express = require("express");
const NotesModel = require("../models/notes")
const notesRouter = express.Router()

notesRouter.get("/" , (req , res)=>{

    console.log("Notes router")
    res.json({
        mesage : "Notes router",
        status :  true
    })
})

notesRouter.patch("/notes/:noteId" , async (req , res)=>{
    const { noteId } = req.params ;
    const { title , content } =  req.body ;
    const updatedNote = await NotesModel.findOneAndUpdate( {  _id : noteId } , { title , content } ,  {
        new : true
    });

    res.json(updatedNote);
})


notesRouter.delete("/notes/:noteId" , async (req , res)=>{
    const {noteId} = req.params;
    const deleteNote = await NotesModel.deleteOne({_id : noteId})
    res.json({
        message : "successfully deleted"
    })
})

notesRouter.get("/notes"  , async (req , res)=>{
    const Notes =  await NotesModel.find({})
    res.json(Notes)
})

notesRouter.get("/notes/:noteId" , async (req , res)=>{
    const {noteId} = req.params
    const Note = await NotesModel.findOne({_id : noteId })

    res.json(Note);
})

notesRouter.post("/notes" , async (req , res)=>{
    const {  title , content } = req.body;
    
    const newNote = await new NotesModel({title , content});
    newNote.save().then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.status(400).json({
            message : err.message 
        })
    });

})


module.exports = notesRouter;