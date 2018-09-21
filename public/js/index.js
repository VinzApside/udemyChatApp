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
  const formatedTime = moment(message.createdAt).format('h:mm a')

  let template = jQuery('#message-template').html();
  let html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formatedTime,
  });

  jQuery('#messages').append(html);

  // console.log('new message :', message)

  // let li = jQuery('<li></li>');
  // li.text(`${message.from} ${formatedTime} : ${message.text}`);

  // jQuery('#messages').append(li);
})


// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'hi !'
// }, (data) => {
//   console.log("got it", data);
// });


socket.on('newLocationMessage', (message) => {
  const formatedTime = moment(message.createdAt).format('h:mm a');

  const template = jQuery('#location-message-template').html();
  const html = Mustache.render(template, {
    from: message.from,
    createdAt: formatedTime,
    url: message.url,
  })
  jQuery('#messages').append(html)


  // const li = jQuery('<li></li>');
  // const a = jQuery('<a target="_blank">My current location</a>')

  // li.text(`${message.from}  ${formatedTime} : `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);

})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  const messageTextbox = jQuery('[name=message]')
  socket.emit('createMessage', {
    from: 'user',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('') //reset le message après l'envoi
  })
})

let locationButton = jQuery('#send-location');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser')
  }

  locationButton.attr('disabled', 'disabled').text('Sending location ...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Sending location');
    // console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
  }, function () {
    locationButton.removeAttr('disabled').text('Sending location');
    alert('Unable to fetch location.')
  })
})