// server/index.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
const PORT = 3001;

const userRoutes = require('./routes/users');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/api/users', userRoutes);

// WebSocket para el juego online
io.on('connection', (socket) => {
  console.log('🎮 Nuevo jugador conectado');

  socket.on('joinRoom', (room) => {
    socket.join(room);
    socket.to(room).emit('playerJoined');
  });

  socket.on('move', ({ room, board, turn }) => {
    socket.to(room).emit('updateBoard', { board, turn });
  });

  socket.on('restart', (room) => {
    io.to(room).emit('restartGame');
  });
});

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`🚀 Servidor API y WebSocket en http://localhost:3001`);
});
