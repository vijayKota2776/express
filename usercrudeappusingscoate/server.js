const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const users=[
    {id:1, name:"Amit",email:"amit@gmail.com"},
    {id:2, name:"Suman",email:"suman@gmail.com"}
]

io.on('connection', (socket) => {
    console.log('User with ID', socket.id, 'connected');

    io.emit('users',users);

    socket.on('add-user', (user)=>{

        const newUser={
            id:users.length+1,
            name:user.name,
            email:user.email
        }

        users.push(newUser);
        io.emit('users', users);
    })

    socket.on('delete-user', (id)=>{
        const index=users.findIndex(user=>user.id===id);
        if(index!==-1){
            users.splice(index,1);
            io.emit('users', users);
        }
    })

    socket.on("update-user", (updatedUser) =>{
        const user=users.find((u)=>u.id===parseInt(updatedUser.id));

        user.name=updatedUser.name;
        user.email=updatedUser.email;
        io.emit("users", users);
    })

    socket.on('disconnect', ()=>{
        console.log('User with ID', socket.id, 'disconnected');
    })
});

server.listen(4000, () => {
    console.log('Server is running on port 4000')
});