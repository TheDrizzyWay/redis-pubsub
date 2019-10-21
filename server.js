import { app, server } from './socketfile';
import express from 'express';

app.use(express.json());

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`process running on port ${port}`));