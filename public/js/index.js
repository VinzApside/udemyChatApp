let socket = io()
//  permet de faire connexion entre front et back
socket.on('connect', () => {
  console.log(' the user is connected')

  // socket.emit('createEmail', {
  //   to: 'jen@example.com',
  //   text: "hey, it's me !"
  // })
})
socket.on('disconnect', () => {
  // bug possible en mobile si on utilise fonction flechee plutot que function
  console.log('disconnected from server')
})

socket.on('newEmail', email => {
  // on cree un evenement newEmail
  console.log('new email', email)

  // socket.emit('createMessage', {
  //   from: 'the user',
  //   text: 'hello, is it me you looking for ?'
  // })
})

socket.on('newMessage', message => {
  console.log('new message :', message)
})


