const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow frontend to connect
    methods: ['GET', 'POST'],
  },
});

// const io = new Server(server, {
//     cors: {
//       origin: '*', // Allow all origins for testing
//       methods: ['GET', 'POST'],
//     },
//   });

  console.log('Waiting for connections...'); // Add this line

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.emit('test', 'Connection successful');
// Broadcast cursor position
socket.on('cursorMove', (data) => {
    socket.broadcast.emit('cursorUpdate', { ...data, userId: socket.id });
  });

  // Broadcast drawing actions
  socket.on('draw', (data) => {
    console.log('Received draw event:', data); // Debug
    socket.broadcast.emit('drawUpdate', { ...data, userId: socket.id });
  });
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    socket.broadcast.emit('userDisconnected', socket.id);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});