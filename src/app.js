var express = require('express'),
    session = require('express-session');

var app = express();
app.listen(1337);

app.use(session({secret : "Morgan Freeman is a snowman who plays the trumpet"}));
app.use(express.static('content'));

app.get('/facebook', function (req, res) {
    console.log(1);
    res.sendfile('Facebook.html', {root : 'content'});
});

app.get('/fake', function (req, res) {
  res.json({message : "This is a fake message"});
});

module.exports = app;
