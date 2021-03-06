var express = require('express'),
    session = require('express-session'),
    db      = require('./db.js'),
    map     = require('./map.js').map,
    choose  = require('./choose.js'),
    nar     = require('./narrative.js');

var app = express();
app.listen(1337);

app.use(session({secret : "Morgan Freeman is a snowman who plays the trumpet"}));
app.use(express.bodyParser());
app.use(express.static('content'));
app.use('/content', express.static('content'));

app.get ('/index.html', function (req, res) {
    if (req.session != null) {
        req.session.choices = [];
        req.session.page = null;
    }
    return res.sendfile('index.html');
});
app.get ('/', choose.retrieve);
app.get ('/content/:pgsrc', choose.embed);
app.post('/', choose.process);

app.get ('/play/:uuid', function (req, res) {
    console.log('play');
    nar.loadnarrative(req.params.uuid, function (val) {
        req.session.narrative = val;
        res.redirect('/');
    });
});

app.get ('/create', choose.createnarrativeget);
app.post('/create', choose.createnarrativepost);

module.exports = app;
