import http from 'http';
import express from 'express';
import socket from 'socket.io';
import redis from 'redis';
import redisSocket from 'socket.io-redis';
import dotenv from 'dotenv';
import storage from './memoryStorage';

const app = express();
const server = http.createServer(app);
const io = socket(server);
dotenv.config();

const { REDIS_URL } = process.env;
let pubClient = redis.createClient(REDIS_URL);
let subClient = redis.createClient(REDIS_URL, { return_buffers: true });
io.adapter(redisSocket({ pubClient, subClient }));

io.on('connection', (socket) => {
    console.log('publisher connected');

    socket.on('message', (message) => {
       storage.push(message);
    });
 
    socket.on('disconnect', () => {
       console.log('publisher disconnected');
    });
 });

 export { server, app };