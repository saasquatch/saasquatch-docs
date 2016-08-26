const express = require('express');

const preview = require('./metalsmith/preview');
const fs = require('fs');
const path = require('path');

var superstaticServer = require('superstatic').server;

var app = express();

app.use(express.static('build'));

app.use('/preview/:entryId', function fooMiddleware(req, res, next) {
  // req.url starts with "/foo"
    const id = req.params.entryId; //'4xPLaXY5yEk6e6s26MEKyo';
    console.log(`Building Preview for id: ${id}`)
    const callback = function(err){
        if(err){
            console.error(err);
        }
        next();
        console.log('done building preview');
    }
    preview(id, callback);
});


app.listen(process.env.PORT, function() {
    console.log("Started. Listening on Port:" + process.env.PORT)
});
