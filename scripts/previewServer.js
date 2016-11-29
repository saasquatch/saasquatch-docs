import express from 'express';
import preview from '../metalsmith/preview';

const app = express();

app.use('/preview/:entryId', function fooMiddleware(req, res, next) {
  // req.url starts with "/foo"
    const id = req.params.entryId; //'4xPLaXY5yEk6e6s26MEKyo';
    console.log(`Building Preview for id: ${id}`);
    const callback = function(err){
        if(err){
            console.error(err);
        }
        next();
        console.log('done building preview');
    };
    preview(id, callback);
});

app.use(express.static('build'));

app.listen(process.env.PORT, function() {
    console.log("Started. Listening on Port:" + process.env.PORT);
});
