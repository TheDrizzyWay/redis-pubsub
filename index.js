import AfricasTalking from 'africastalking';
import { app, server } from './server/socketfile';
import storage from './server/memoryStorage';
import { atUsername, atKey } from './server/config';

const at = new AfricasTalking({ apiKey: atKey, username: atUsername });

const welcomeMsg = `CON Hello and welcome to PizzaGo.
Have your pizza delivered to you fast and hot.
Enter your name to continue.`;

const orderDetails = {
    name: '',
    description: '',
    address: '',
    telephone: '',
    open: true
};

const lastData = '';

app.get('/messages', (req, res) => {
    return res.status(200).json({
        success: true,
        response: storage
    });
});

app.post('/orders', (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;
    console.log(text);
    const textArray = text ? text.split('*') : [];
    const textValue = textArray.length;
    let message = '';

    switch(textValue) {
        case 0:
            message = welcomeMsg;
            break;
        case 1:
            message = `CON Select your pizza variety
            1. Neapolitan pizza
            2. Sicilian pizza
            `;
            orderDetails.name = textArray[textValue - 1];
            break;
        case 2: 
            message = 'CON Where do we deliver it?';
            break;
        case 3:
            message = 'END Thanks for your order. Enjoy your meal in advance';
    }

    res.contentType('text/plain');
    res.status(200).send(message);
});

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`process running on port ${port}`));
