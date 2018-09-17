const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

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

  socket.emit('newEmail', {
    // on recupere l'evenement créer dans le js
    from: 'mike@example.com',
    text: "hey, what's going on",
    createAt: 123
  })


  socket.on('createEmail', newEmail => {
    console.log('createEmail', newEmail)
  })

  socket.on("createMessage", (message)=>{
    console.log('create message :', message)
  })

  socket.emit('newMessage',
  {
    from: 'john',
    text:"see you there",
    createdAt : 123
  })
})

server.listen(port, () => {
  console.log(`Server is up on ${port}`)
})
