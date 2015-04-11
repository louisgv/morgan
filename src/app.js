var express = require('express'),
    session = require('express-session'),
    fs      = require('fs');

var app = express();
app.listen(1337);

app.use(session({secret : "Morgan Freeman is a snowman who plays the trumpet"}));
app.use(express.bodyParser());
app.use(express.static('content'));
app.use('/node', express.static('content'));

var map = {
    'start' : { 0 : 'dispa', 1 : 'dispa', 2 : 'dispa', file : "start.html" },
    'dispa' : { 0 : 'strat', 1 : 'strat', 2 : 'strat', file : "Facebook.html", zed : "Test comment number 1", one : "Test comment number 2", two : "Test comment number 3" },
    'strat' : {	0 : 'event', 1 : 'event', 2 : 'event', file : "Twitter.html" },
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

var narrative = {
    'start' : 'This is the start',
    'dispa' : 'There is a lot of disparity',
    'strat' : 'Stratification is high',
    'event' : 'Shocking events happen',
    'nlike' : 'Boo, this is lame',
    'ylike' : 'Finally time that the news shows this happening',
    'sprot' : 'Protestors are gathering',
    '3prot' : 'The protestors are restless and numerous',
    '3pigs' : 'The police are here to save the day',
    '3viol' : 'The hooligans are being kept in line',
    '3riot' : 'Rioters block the streets in business district',
    '3cage' : 'Violent protestors met by peaceful police',
    '1prot' : 'These guys are just sitting around',
    '1pigs' : 'The police dont know what they are doing',
    '1viol' : 'Unrecognized protestors are being violent',
    '1riot' : 'Rioters make it unsafe to protest peacefully',
    '1cage' : 'It feels safe to protest in a free speech zone',
    '1died' : 'Nobody wants to protest if it isnt nice out',
    '3died' : 'Nobody wants to protest if it isnt nice out',
    '_exit' : 'You\'ve been manipulated. Now it is your turn',
}

function embed(req, res) {
//      res.sendfile(map[req.params.pgsrc].file, {root : 'content'});
	fs.readFile('./content/' + map[req.params.pgsrc].file, function (err, data) {
		if (err) return res.json({error : err});
                var string = "" + data;
		res.write(string.replace("--REPLACE--", narrative[req.session.page]));
                res.end();
        });
}

function retrieve(req, res) {
        var s = req.session;

        if (s.page == null) s.page = 'start';
        if (s.page == "start" || s.page == "_exit") return res.sendfile(map[s.page].file, {root : 'content'});

        var html = "<html><body><iframe src=\"node/";
        if (s.page == null) s.page = "start";
        html += s.page + "\" width=\"100%\" height=\"80%\" frameBorder=\"0\"></iframe>";
	html += "<div style=\"position : absolute; bottom : 0; left : 0\"><form name=\"morgan\" action=\"/\" method=\"POST\">";
        html += "<input type=\"radio\" name=\"choice\" value=\"0\">" + map[s.page]['zed'] + "<br>";
        html += "<input type=\"radio\" name=\"choice\" value=\"1\">" + map[s.page]['one'] + "<br>";
        html += "<input type=\"radio\" name=\"choice\" value=\"2\">" + map[s.page]['two'] + "<br>";
        html += "<input type=\"submit\" name=\"submit\" value=\"submit\">";
        html += "</form></div>";
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
        } else if (s.page == 'start') {
        	req.session.email = b.email;
        	req.session.phone = b.phone;
                s.page = map[s.page][0];
        }

	return res.redirect('/');
}

app.get ('/', retrieve);
app.get ('/node/:pgsrc', embed);
app.post('/', process);

module.exports = app;
