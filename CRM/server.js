const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var morgan     = require('morgan');
var passport = require('passport');
var path = require('path')
const cors = require("cors");



app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
require('dotenv').config()

// APP CONFIGURATION ==================
// ====================================
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// configure our app to handle CORS requests
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

// log all requests to the console 
app.use(morgan('dev'));

// student can try to conntect to Mongo remotely which post in cloud
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://myMongoDBUser:Abc123456@cluster0-lvepn.mongodb.net/test?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log('Connect to database'));
mongoose.set('useCreateIndex', true);

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'))

// ROUTES FOR OUR API =================
// ====================================
// API ROUTES ------------------------
// user api
const userRouter = require("./router/user.Router");
app.use("/users", userRouter);
// authentication api
var apiRoutes = require('./app/routes/api')(app, express);
//facebook api
var social = require('./app/passport/passport')(app,passport);
apiRoutes.get('/me',function(req,res){
    res.send(req.decoded);
})
app.use('/api', apiRoutes);

// MAIN CATCHALL ROUTE --------------- 
// SEND USERS TO FRONTEND ------------
// has to be registered after API ROUTES
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'))
})



const port = 3000
app.listen(port, () => {
    console.log(`Listening to port: ${port}`)
})
