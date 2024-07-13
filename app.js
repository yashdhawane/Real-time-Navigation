const express = require('express');
const { createServer } = require('node:http');
const socketio =require("socket.io");
const path =require('path');

const app = express();
const server = createServer(app);

const io=socketio(server);
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.get('/', (req, res) => {
  res.render("index.ejs");
});

io.on("connection",function(socket){
    console.log("connected");
    socket.on("send-location",function(data){
      io.emit("receive-location",{id:socket.id,...data})
    });
    socket.on("disconnect",function(){
      io.emit("user-disconnected",socket.id);
    })
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});