const express = require('express');
const app=express();
app.use(express.json());
const createError = require('http-errors');

app.use('/', require('./routes/index'));

//create error
app.use(function(req, res, next) {
    next(createError(404));
});



module.exports = app;