const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

const users = new Map();

io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  // send current users count to everyone (including the new connection)
  io.emit('user-count', users.size);

  socket.on('new-user-joined', (username) => {
    if (!username || !username.toString().trim()) return;
    users.set(socket.id, username.toString().trim());
    io.emit('user-count', users.size);
    console.log(`User joined: ${username} (${socket.id})`);
  });

  socket.on('send-message', (message) => {
    if (!message || !message.toString().trim()) return;
    const username = users.get(socket.id) || 'Anonymous';
    // broadcast to everyone except the sender
    socket.broadcast.emit('receive-message', { userName: username, message: message.toString() });
  });

  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    users.delete(socket.id);
    io.emit('user-count', users.size);
    console.log('User disconnected', socket.id, username || '');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});