const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


app.get('/', (req, res) => {
    res.send('This is the Home Page of the Ride A Bike Server');
});

app.get('/new', (req, res) => {
    res.send('This is the New Route of the Ride A Bike Server');
});

const PORT = process.env.PORT || 5051;

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser : true, useUnifiedTopology: true})
        .then(() => app.listen(PORT, ()=> console.log(`Server Running on port ${PORT}`)))
        .catch((error)=> console.log(error.message));