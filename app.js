const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send('This is the Home Page of the Ride A Bike Server');
});

app.get('/new', (req, res) => {
    res.send('This is the New Route of the Ride A Bike Server');
});

const port = process.env.port || 5051;

app.listen(port, ()=> {
    console.log(`Listening on the Port ${port}`);
})