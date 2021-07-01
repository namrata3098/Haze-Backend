const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const accountRounter = require('./api/account')

console.log("hello node");

const app = express();

app.use(cors({ origin : 'http://localhost:3000'}))

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use('/login' ,accountRounter );

app.use((err, req , res , next) => {
    const statusCode = err.statusCode || 500 ;
    
    res.status(statusCode).json({
        type: 'error', message: err.message
    })
})

module.exports = app;