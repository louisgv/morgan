var express = require('express'),
    session = require('express-session');

var app = express();

var map =
{
        'disp': {
                0       : 'stra',
                1       : 'stra',
                2       : 'stra',
                file    : 'Facebook.html',
        }
}

app.listen(1337);

app.use(session({secret : "Morgan Freeman is a snowman who plays the trumpet"}));

app.use(express.bodyParser());

app.use(express.static('content'));

app.get('/set', function (req, res) {
    req.session.data = 1;
    res.json({message : "Set the data to 1"});
});

app.get('/get', function (req, res) {
    res.json({message : "Get the data", data : req.session.data});
});


app.get('/fb', function (req, res) {
    res.sendfile('Facebook.html', {root : 'content'});
});

function embed(req, res){

        res.sendfile(map[req.params.pgsrc].file,
        { root : 'content' });

}

function retrieve(req, res){
        // show body choice
        var s = req.session;

        var html = "<html><body><iframe src=\"node/";

        if (s.page == null){
                s.page = "disp";

        }

        html += s.page + "\"/>";


        /*
        TODO: Add a <div> for form etc..
        */

        html += "</body></html>";

        res.write(html);

        res.end();
        // show session choices

        // show page
}


function process(req, res){

        var s = req.session;

        var b = req.body;

        var c = b.choice;

        if( c >= 0 && c < 3){
                if (s.choices == null)
                        s.choices = [];
                s.choices.push(c);

                s.page = map[s.page][c];

                // TODO: Conditionals
        }
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
