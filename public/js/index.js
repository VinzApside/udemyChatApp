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

  let li = jQuery('<li></li>');
  li.text(`${message.from} : ${message.text}`);

  jQuery('#messages').append(li);
})


// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'hi !'
// }, (data) => {
//   console.log("got it", data);
// });


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'user',
    text: jQuery('[name= message]').val()
  }, function () {

  })
})