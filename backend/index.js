const express = require("express")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
    },
})
const cors = require("cors")
app.use(cors())
io.on("connection", (socket) => {
    socket.on("message", ({ name, message, uid }) => {
        console.log(uid)
        console.log("message arrived", name, message)
        io.emit("message", { name, message, uid })
    })
})

http.listen(3000, () => {
    console.log("Server Running on port 3000")
})
