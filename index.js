const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 8000;


server.listen(port, () => {
    console.log(`listening on port ${port}`);
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

// namescpaces
// tech namespace
const tech = io.of('/tech');

tech.on('connection', (socket) => {

    // Event when Someone join a room.
    socket.on('join', (data) => {
        socket.join(data.room);
        tech.in(data.room).emit('message', `New user joined ${data.room} room!`);
    })

    // Event when someone send a message in tech room.
    socket.on('message', (data) => {
        console.log(`message: ${data.msg}`);
        tech.in(data.room).emit('message', data.msg);
    });

    // Event when someone disconnect from the tech room.
    socket.on('disconnect', () => {
        console.log('user disconnected');

        tech.emit('message', 'user disconnected');
    })
})
