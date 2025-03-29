const express = require("express")
const app = express();

const port = 9090;
const connectDB = require("./config/database")
const notesRouter = require("./routes/notes")

app.use(express.json())

app.use("/"  , notesRouter);

connectDB().then(()=>{
    console.log("database connection is established");
    app.listen(port , ()=>{
        console.log(`server is runnung at http://localhost:${port}`)
    })
}).catch((err)=>{
    console.log("database connection cannot be established" + err.message)
})


