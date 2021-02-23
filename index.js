/* eslint-disable no-unused-vars */
const path = require('path');
const http = require('http');

const express = require('express');
const socketio = require('socket.io');

const app = express();

const debug = require('debug')('app');
const chalk = require('chalk');

const server = http.createServer(app);
const io = socketio(server);

const PORT = 3030 || process.env.PORT;

// set static folder

app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects

io.on('connection', (socket) => {
  debug('New web socket connection');
});

server.listen(PORT, () => {
  debug(`Server is running on port ${chalk.blue(PORT)}`);
});
