
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: ['http://localhost:3000', 'http://192.168.101.12:3000', 'http://192.168.101.13:3000'],
//     methods: ['GET', 'POST'],
//     credentials: true,
//   },
// });

// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   socket.on('cursorMove', (data) => {
//     socket.broadcast.emit('cursorUpdate', { ...data, userId: socket.id });
//   });

//   socket.on('draw', (data) => {
//     console.log('Received draw event from:', socket.id, 'Data:', data);
//     const broadcastData = { ...data, userId: socket.id };
//     console.log('Broadcasting drawUpdate:', broadcastData);
//     socket.broadcast.emit('drawUpdate', broadcastData);
//   });

//   socket.on('stickyNote', (data) => {
//     console.log('Received stickyNote from:', socket.id, 'Data:', data);
//     socket.broadcast.emit('stickyNote', data);
//   });

//   socket.on('stickyNoteUpdate', (data) => {
//     console.log('Received stickyNoteUpdate from:', socket.id, 'Data:', data);
//     socket.broadcast.emit('stickyNoteUpdate', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//     socket.broadcast.emit('userDisconnected', socket.id);
//   });
// });

// const PORT = 4000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://192.168.101.12:3000', 'http://192.168.101.13:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('cursorMove', (data) => {
    socket.broadcast.emit('cursorUpdate', { ...data, userId: socket.id });
  });

  socket.on('draw', (data) => {
    console.log('Received draw event from:', socket.id, 'Data:', data);
    const broadcastData = { ...data, userId: socket.id };
    console.log('Broadcasting drawUpdate:', broadcastData);
    socket.broadcast.emit('drawUpdate', broadcastData);
  });

  socket.on('shape', (data) => {
    console.log('Received shape from:', socket.id, 'Data:', data);
    const broadcastData = { ...data };
    console.log('Broadcasting shape:', broadcastData);
    socket.broadcast.emit('shape', broadcastData);
  });
  
  socket.on('stickyNote', (data) => {
    console.log('Received stickyNote from:', socket.id, 'Data:', data);
    const broadcastData = { ...data };
    console.log('Broadcasting stickyNote:', broadcastData);
    socket.broadcast.emit('stickyNote', broadcastData);
  });

  socket.on('stickyNoteUpdate', (data) => {
    console.log('Received stickyNoteUpdate from:', socket.id, 'Data:', data);
    socket.broadcast.emit('stickyNoteUpdate', data);
  });

  socket.on('erase', (data) => {
    console.log('Received erase from:', socket.id, 'Data:', data);
    socket.broadcast.emit('erase', data);
  });

  socket.on('clearCanvas', () => {
    console.log('Received clearCanvas from:', socket.id);
    socket.broadcast.emit('clearCanvas');
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