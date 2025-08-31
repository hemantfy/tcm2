const express = require("express")
const app = express()

const swaggerUi = require('swagger-ui-express')
const redoc = require('redoc-express')
const swaggerDocument = require('./swagger-output.json')
const connectToDB = require("./db/database")
require("dotenv").config()
const cors = require("cors")

const clientRouter = require("./routers/client.router")


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
  origin: '*', // or add your frontend domain(s)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

connectToDB()

// API Documentation routes
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerDocument)
})
app.get('/redoc', redoc({
  title: 'Task Manager API Documentation',
  specUrl: '/swagger.json'
}))



app.use("/api/clients" , clientRouter)


app.get("/", (req , res)=>{
   res.send("wellcome to Taskmanager")
})

module.exports = app
