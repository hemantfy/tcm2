const http = require("http")
const app = require("./app")


const  post = process.env.PORT || 4000
const server = http.createServer(app)

server.listen(post, ()=>{
    console.log(`server is runing on http://localhost:${post}`)
})