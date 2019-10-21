import http from 'http';
import express from 'express';
import socket from 'socket.io';
import redis from 'redis';
import redisSocket from 'socket.io-redis';
import dotenv from 'dotenv';

const app = express();
const server = http.createServer(app);
const io = socket(server);
dotenv.config();

io.set('transports', ['websocket']);

const { REDIS_HOST, REDIS_PORT } = process.env;
let pubClient = redis.createClient(REDIS_PORT, REDIS_HOST);
let subClient = redis.createClient(REDIS_PORT, REDIS_HOST, { return_buffers: true });
io.adapter(redisSocket({ pubClient, subClient }));

io.on('connection', (socket) => {
    console.log('publisher connected');
 
    socket.on('disconnect', () => {
       console.log('publisher disconnected');
    });
 });

 export { server, app };