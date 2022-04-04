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

// io.on('connection', (socket) => {
//         console.log('user connected')
//         socket.emit('message', { manny: 'Hey my boy!'})
//         socket.on('another event', (data) => {
//             console.log(data)
//         })
// })

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('message', (msg) => {
        console.log(`message: ${msg}`);
        io.emit('message', msg);
    })
})