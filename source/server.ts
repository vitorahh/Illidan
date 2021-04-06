require('dotenv').config();

import express from 'express';
import cors from 'cors';

import { createServer } from "http";
import { Server, Socket } from "socket.io";


const app = express();
const httpServer = createServer(app);
const path = require('path');



//Controllers ou Routes
const UserController = require('./Controllers/UserController');
const PersonagensController = require('./Controllers/PersonagensController');


//middleware do Bodyparser para tratar as Requisicoes
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//Deixando a pasta tmp publica para acesso as imagens
app.use(express.static(path.join(__dirname,'..', '/tmp')));

app.use('/User', UserController);
app.use('/Personagem', PersonagensController);


app.get('/', (req,res)=>{
    res.send(
        { 
          Message: "Funcionando",
          infor:{
            path:__dirname,
            dire: path.join(__dirname,'..', '/tmp')
          }
        })
})

export const WebScoket = require('socket.io')(httpServer);

WebScoket.on('connection', (socket:Socket) =>{
    console.log(socket.id);
    console.log(socket.handshake.auth)

    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
})


httpServer.listen(process.env.PORT || 6060, () => {
    console.log(`Server ON - https://illidanapp.herokuapp.com/`);
});