import { app, server } from './server/socketfile';
import express from 'express';
import storage from './server/memoryStorage';

app.use(express.json());

app.get('/messages', (req, res) => {
    return res.status(200).json({
        success: true,
        response: storage
    });
});

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`process running on port ${port}`));