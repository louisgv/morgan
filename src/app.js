var express = require('express'),
    session = require('express-session');

var app = express();
app.listen(1337);

app.use(session({secret : "Morgan Freeman is a snowman who plays the trumpet"}));
app.use(express.static('content'));

app.get('/set', function (req, res) {
    req.session.data = 1;
    res.json({message : "Set the data to 1"});
});

app.get('/get', function (req, res) {
    res.json({message : "Get the data", data : req.session.data});
});

app.get('/facebook', function (req, res) {
    res.sendfile('Facebook.html', {root : 'content'});
});

app.get('/fake', function (req, res) {
  res.json({message : "This is a fake message"});
});

module.exports = app;
