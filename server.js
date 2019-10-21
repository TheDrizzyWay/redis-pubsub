import express from 'express';
import http from 'http';
import socket from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.json());

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`process running on port ${port}`));