const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('../server/utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const users = new Users();

app.use(express.static(publicPath))

io.on('connection', socket => {
  console.log('new user connected')

  socket.on('disconnect', () => {
    console.log('the user is disconnected')
    const user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('UpdateUserList', users.getUsersList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  })

  // socket.emit('newEmail', {
  //   // on recupere l'evenement créer dans le js
  //   from: 'mike@example.com',
  //   text: "hey, what's going on",
  //   createAt: 12312
  // })


  // socket.on('createEmail', newEmail => {
  //   console.log('createEmail', newEmail)
  // })

  // socket.emit from admin text welcome to chat-app


  // socket.broadcast.emit from admin text new user joined


  socket.on("createMessage", (message, callback) => {
    // console.log('create message :', message)

    
    io.emit('newMessage', generateMessage(message.from, message.text));

    callback('This is from the server');
    // envoyé à tout le monde


    // socket.broadcast.emit('newMessage', {
    //   // permet de ne pas envoyer à la personne qui emet mais tous les autres
    //   from: message.from,
    //   text: message.text,
    //   createAt: new Date().getTime()
    // });
  })

  socket.on("createLocationMessage", (coords) => {
    console.log(coords);
    //io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`))
    io.emit('newLocationMessage', generateLocationMessage('user', coords.latitude, coords.longitude))
  })

  // socket.emit('newMessage',
  //   {
  //     from: 'john',
  //     text: "see you there",
  //     createdAt: 123
  //   })

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.')
    }

    socket.join(params.room); //allow join the room
    //  socket.leave(params.room); // allow to leave the room

    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('UpdateUserList', users.getUsersList(params.room));

    // io.to('the office fans').emit //send a message to the office fans room
    // socket.broadcast.to('the office fans') //send  a message to everyone expect the emiter

    socket.emit("newMessage",
      generateMessage('Admin', 'Welcome to chat app')
    )
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined ${params.room}`))

    callback();
  })
})

server.listen(port, () => {
  console.log(`Server is up on ${port}`)
})
