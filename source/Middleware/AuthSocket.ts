import { Socket } from "socket.io";

import Jwt from 'jsonwebtoken';

const hash = require('../Config/jwt');

export function ValidationSocket(Socket:Socket, next:any){
    const authHeader = Socket.handshake.auth;

    //verifica se existe authorization
    if(!authHeader){
        const err = new Error("No Token Provided");
        next(err);
    }

    //validação se o token e valido

    Jwt.verify('authHeader', hash.secret, (err:any, decoded:any) =>{
        if(err)
        {
            const err = new Error("Token invalid");
            next(err);
        }

        //Socket.request.user = decoded.UserID;

        return next();
    })
}
