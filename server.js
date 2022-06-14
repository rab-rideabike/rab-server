const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5051;

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser : true, useUnifiedTopology: true})
        .then(() => app.listen(PORT, ()=> console.log(`Server Running on port ${PORT}`)))
        .catch((error)=> console.log(error.message));
