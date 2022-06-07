const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send('This is the Home Page of the Ride A Bike Server');
});

app.get('/new', (req, res) => {
    res.send('This is the New Route of the Ride A Bike Server');
});


app.listen(5051, ()=> {
    console.log('Listening on the Port 5051')
})