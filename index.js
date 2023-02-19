const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');


const URLRoute = require('./routes/url');
const handleRedirection = require('./routes/url');
const handleAnalytics = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRouer = require('./routes/user');


const { connectToMongoDB } = require('./config/connect');
const dotenv = require('dotenv');

dotenv.config({path: './config/config.env'})

const app = express();
const PORT = process.env.PORT; 

connectToMongoDB(process.env.MONGOOSE_URL).then( 
    ()=>{console.log('DB connected!')}
);

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/' ,URLRoute, handleRedirection, handleAnalytics);
app.use('/', staticRoute);
app.use('/', userRouer);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));