/* eslint-disable no-plusplus */
/* eslint-disable no-empty */
/* eslint-disable no-alert */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const modalList = document.getElementById('user-modal');

// Get username and room from URL
const {
  username, room, email, contact, position,
} = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', {
  username, room, email, contact, position,
});

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span> ${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = `${room} Room`;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  modalList.innerHTML = '';
  // console.log(users);

  for (i = 0; i < users.length; i++) {
    console.log(users[i]);
  }

  users.forEach((user) => {
    const li = document.createElement('li');
    // console.log(user);
    li.className = ('usr btn btn-primary userFromList');
    li.setAttribute('type', 'button');
    li.setAttribute('data-bs-toggle', 'modal');
    li.setAttribute('data-bs-target', '#exampleModal');
    li.innerText = user.username;
    userList.appendChild(li);

    const lii = document.createElement('li');
    lii.innerText = user.email;
    modalList.appendChild(lii);
  });
}
