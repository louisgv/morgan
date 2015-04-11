var express = require('express'),
    session = require('express-session');

var app = express();
app.listen(1337);

app.use(session({secret : "Morgan Freeman is a snowman who plays the trumpet"}));
app.use(express.bodyParser());
app.use(express.static('content'));
app.use('/node', express.static('content'));

var map = {
    'start' : { 0 : 'dispa', 1 : 'dispa', 2 : 'dispa', file : "Facebook.html" },
    'dispa' : { 0 : 'strat', 1 : 'strat', 2 : 'strat', file : "Facebook.html" },
    'strat' : {	0 : 'event', 1 : 'event', 2 : 'event', file : "Facebook.html" },
    'event' : {	0 : 'nlike', 1 : 'ylike', 2 : 'nlike', file : "Facebook.html" },
    'nlike' : { 0 : 'sprot', 1 : 'sprot', 2 : 'sprot', file : "Facebook.html" },
    'ylike' : { 0 : 'sprot', 1 : 'sprot', 2 : 'sprot', file : "Facebook.html" },
    'sprot' : { 0 : '3prot', 1 : '3prot', 2 : '1prot', file : "Facebook.html" },
    '3prot' : { 0 : '3pigs', 1 : '3pigs', 2 : '3pigs', file : "Facebook.html" },
    '3pigs' : { 0 : '3viol', 1 : '3viol', 2 : '3viol', file : "Facebook.html" },
    '3viol' : { 0 : '3riot', 1 : '3cage', 2 : '3cage', file : "Facebook.html" },
    '3riot' : { 0 : '3died', 1 : '3died', 2 : '3died', file : "Facebook.html" },
    '3cage' : { 0 : '3died', 1 : '3died', 2 : '3died', file : "Facebook.html" },
    '1prot' : { 0 : '1pigs', 1 : '1pigs', 2 : '1pigs', file : "Facebook.html" },
    '1pigs' : { 0 : '1viol', 1 : '1viol', 2 : '1viol', file : "Facebook.html" },
    '1viol' : { 0 : '1riot', 1 : '1cage', 2 : '1cage', file : "Facebook.html" },
    '1riot' : { 0 : '1died', 1 : '1died', 2 : '1died', file : "Facebook.html" },
    '1cage' : { 0 : '1died', 1 : '1died', 2 : '1died', file : "Facebook.html" },
    '1died' : {	0 : '_exit', 1 : '_exit', 2 : '_exit', file : "Facebook.html" },
    '3died' : { 0 : '_exit', 1 : '_exit', 2 : '_exit', file : "Facebook.html" },
    '_exit' : { 0 : '_exit', 1 : '_exit', 2 : '_exit', file : "Facebook.html" },
}

function embed(req, res) {
        res.sendfile(map[req.params.pgsrc].file, {root : 'content'});
}

function retrieve(req, res) {
        var s = req.session;

        var html = "<html><body><iframe src=\"node/";
        if (s.page == null) s.page = "dispa";
        html += s.page + "\"/>";

        /*
        TODO: Add a <div> for form etc..
        */

        html += "</body></html>";

        res.write(html);
        res.end();
}

function process(req, res) {
        var s = req.session;
        var b = req.body;
        var c = b.choice;

        if (c >= 0 && c < 3){
                if (s.choices == null)
                        s.choices = [];

                s.choices.push(c);
                s.page = map[s.page][c];
        }

	return res.redirect('/');
}

app.get ('/', retrieve);
app.get ('/node/:pgsrc', embed);
app.post('/', process);

module.exports = app;

/*------------------------------------------


app.get('/facebook', function (req, res) {
    res.sendfile('Facebook.html', {root : 'content'});
});

app.get('/fake', function (req, res) {
  res.json({message : "This is a fake message"});
});

------------------------------------------*/
