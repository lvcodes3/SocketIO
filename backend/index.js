// dependencies //
import express from 'express';     // express web server
import cors from 'cors';           // cross origin requests
import { Server } from 'socket.io' // web sockets

const app = express();
const PORT = 5000;

// middlewares //
app.use(cors());

// express web server //
const expressWebServer = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

// socket io server //
const io = new Server(expressWebServer, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

// socket listen //
io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected...`);

    socket.on('send_message', (data) => {
        console.log(data.msg);
        socket.broadcast.emit('receive_message', data.msg);
    });
});

