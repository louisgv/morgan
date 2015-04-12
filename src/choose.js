var fs =  require('fs');
var map = require('./map.js').map;
var nar = require('./narrative.js');

module.exports.embed = function (req, res) {
        var narrative = req.session.narrative;

	fs.readFile('./content/' + map[req.params.pgsrc].file, function (err, data) {
		if (err) return res.json({error : err});
                var string = "" + data;

                if (narrative[req.session.page].image)      string = string.replace("--IMAGEVALUE--", narrative[req.session.page].image);
                if (narrative[req.session.page].narrative)  string = string.replace("--REPLACE--", narrative[req.session.page].narrative);
                
		res.write(string);
                res.end();
        });
}

module.exports.retrieve = function (req, res) {
        var s = req.session;

        if (s.page == null) s.page = 'start';
        if (s.narrative == null) s.narrative = nar.default;
        if (s.page == "start" || s.page == "_exit") return res.sendfile(map[s.page].file, {root : 'content'});

        var html = "<html><body><iframe src=\"content/";
        if (s.page == null) s.page = "start";
        html += s.page + "\" width=\"100%\" height=\"100%\" frameBorder=\"0\"></iframe>";
	html += "<div style=\"position : absolute; bottom : 0; left : 0; opacity: .8\"><span><form name=\"morgan\" action=\"/\" method=\"POST\">";
        html += "<button type=\"submit\" name=\"choice\" value=\"0\">" + map[s.page]['zed'] + "</button><br>";
        html += "<button type=\"submit\" name=\"choice\" value=\"1\">" + map[s.page]['one'] + "</button><br>";
        html += "<button type=\"submit\" name=\"choice\" value=\"2\">" + map[s.page]['two'] + "</button><br>";
        html += "</form></span></div>";
        html += "</body></html>";

        res.write(html);
        res.end();
}

module.exports.process = function (req, res) {
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
