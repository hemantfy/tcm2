const express = require("express")
const app = express()
const connectToDB = require("./db/database")
require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


connectToDB()

app.get("/", (req , res)=>{
   res.send("wellcome to Taskmanager")
})

module.exports = app
