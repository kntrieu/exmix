const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');


require('dotenv/config');


const postsRoute = require('./routes/posts');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/posts', postsRoute);


app.use(express.static(__dirname + '/www/build/'));

//Connect to db
mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});


//How to we start listening to the server
app.listen(process.env.PORT || 3000);