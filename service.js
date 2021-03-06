// express
const express = require('express');
const router = require('./routes/apis');
const app = express();

// cross origin
const cors = require('cors');

//parsing body
const bodyParser = require('body-parser');

// db connection
const mongoose = require('mongoose');

require('dotenv').config();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = process.env.MONGO_URI;


mongoose.connect(uri);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to the database');
});

mongoose.Promise = global.Promise;

app.use('/api', router)
app.listen(3000, () => {
    console.log('Started on PORT 3000');
})