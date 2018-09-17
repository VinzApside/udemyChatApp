const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const { generateMessage } = require('./utils/message')
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', socket => {
  console.log('new user connected')

  socket.on('disconnect', () => {
    console.log('the user is disconnected')
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
  socket.emit("newMessage",
    generateMessage('Admin', 'Welcome to chat app')
  )

  // socket.broadcast.emit from admin text new user joined
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'a new user joined'))

  socket.on("createMessage", (message) => {
    console.log('create message :', message)
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createAt: new Date().getTime(),
    });
    // envoyé à tout le monde

    // socket.broadcast.emit('newMessage', {
    //   // permet de ne pas envoyer à la personne qui emet mais tous les autres
    //   from: message.from,
    //   text: message.text,
    //   createAt: new Date().getTime()
    // });
  })

  // socket.emit('newMessage',
  //   {
  //     from: 'john',
  //     text: "see you there",
  //     createdAt: 123
  //   })
})

server.listen(port, () => {
  console.log(`Server is up on ${port}`)
})
