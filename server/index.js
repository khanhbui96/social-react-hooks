const express = require('express');
const mongoose = require('mongoose')
const bodyParse = require('body-parser');
const cors = require('cors');
const passport = require('passport')

require('dotenv').config()

const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http);


const userRouter = require('./routes/user.rourtes');
const msgRouter  = require('./routes/msg.routes');
const postRouter = require('./routes/post.routes');
const interactiveRouter = require('./routes/interactive.routes')

mongoose.connect('mongodb://localhost/myWeb', {useNewUrlParser: true})

io.on('connection', socket=>{
    console.log('a user connected id: '+socket.id);
    socket.on('chat messages', function(msg){
        io.emit('chat messages', msg);
      });
    socket.on('disconnect', ()=>console.log("user disconnect"))
})
app.use(passport.initialize());
require('./configs/passport')(passport);
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended:true}));
app.use(cors());
app.use('/api/users', userRouter);
app.use('/api/msg', msgRouter);
app.use('/api/posts', postRouter);
app.use('/api/interactive', interactiveRouter);

const PORT = 5000;

http.listen(PORT, ()=>console.log(`Server is listening on ${PORT}`))