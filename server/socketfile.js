import http from 'http';
import express from 'express';
import socket from 'socket.io';
import redis from 'redis';
import redisSocket from 'socket.io-redis';
import cors from 'cors';
import storage from './memoryStorage';
import { redisUrl } from './config';

const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = socket(server);

let pubClient = redis.createClient(redisUrl);
let subClient = redis.createClient(redisUrl, { return_buffers: true });
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