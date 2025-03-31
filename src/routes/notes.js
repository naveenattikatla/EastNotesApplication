const express = require("express");
const mongoose = require("mongoose");

const NotesModel = require("../models/notes")
const notesRouter = express.Router()

notesRouter.get("/" , (req , res)=>{
    res.json({
        message : "Welcome to EasyNotes Application",
    })
})

notesRouter.get("/notes"  , async (req , res)=>{
    try{
        const Notes =  await NotesModel.find({})
        if(Notes.length == 0 ){
            return res.json({
                message : "No Notes are Created yet"
            })
        }
        res.json(Notes)

    }catch(err){
        res.json({
            message : err.message
        })
    }
})

notesRouter.get("/notes/:noteId" , async (req , res)=>{
    try{
        const noteId = req.params?.noteId;
        if(!noteId || !mongoose.Types.ObjectId.isValid(noteId)){
            throw new Error("Invalid NoteId " + noteId);
        }
        const Note = await NotesModel.findOne({_id : noteId })
        if(!Note){
            throw new Error("Note not found with id " + noteId);
        }
        res.json(Note);

    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
})

notesRouter.post("/notes" , async (req , res)=>{
    try{
        const {  title , content } = req.body;
        if(!content){
            throw new Error("Note content can not be empty");
        }
        const newNote = await new NotesModel({ title : title || "Untitled Note" , content});
        newNote.save().then((data)=>{
            res.json({
                message : "succuessfully Note created",
                data : data
            });
        }).catch((err)=>{
            res.status(500).json({
                message : err.message  || "Some error occurred while creating the Note."
            })
        });
    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }

})

notesRouter.patch("/notes/:noteId" , async (req , res)=>{
    try{
        const noteId = req.params?.noteId ;
        if(!noteId || ! mongoose.Types.ObjectId.isValid(noteId)){
            throw new Error("Invalid Note Id " + noteId);
        }
        const { title , content } =  req.body ;
        if(!title && !content){
            throw new Error("updation field required")
        }

        const oldNote = await NotesModel.findOne({_id : noteId});
        if(!oldNote){
            throw new Error("Note not found with id " + noteId)
        }

        const updatedNote = await NotesModel.findOneAndUpdate( {  _id : noteId } , { title : title || oldNote.title , content : content || oldNote.content } ,  {
            new : true
        });
        res.json(updatedNote);

    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
})


notesRouter.delete("/notes/:noteId" , async (req , res)=>{
   try{
    const noteId = req.params?.noteId;
    if(!noteId || ! mongoose.Types.ObjectId.isValid(noteId)){
        throw new Error("Invalid NoteId " + noteId);
    }
    const deleteNote = await NotesModel.deleteOne({_id : noteId})
    const deletedCount = deleteNote.deletedCount ;
    if(deletedCount == 0){
        throw new Error("Note not found with id " + noteId)
    }
    res.json({
        message : "Note deleted successfully!"
    })
   }catch(err){
        res.status(400).json({
            message : err.message
        })
   }
})

module.exports = notesRouter;