const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

require('dotenv/config');

const postsRoute = require('./routes/posts');
const filesRoute = require('./routes/files');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
// enable files upload
app.use(fileUpload({
  createParentPath: true
}));

//Define routes ======================================================================================
app.use('/api/posts', postsRoute);
app.use('/api/files', filesRoute);
//====================================================================================================


//Point to UI direction ==============================================================================
app.use(express.static(__dirname + '/www/build/'));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/www/build/', 'index.html'));
});
//====================================================================================================

//Connect to db ======================================================================================
mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("===== MongoDB database connection established successfully");
});
//=====================================================================================================

//Start server ========================================================================================
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`===== Exmix App is listening on port ${port}.`);
});
//=====================================================================================================