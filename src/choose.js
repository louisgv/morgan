var fs =  require('fs');
var map = require('./map.js').map;
var nar = require('./narrative.js');

function createnarrativeget (req, res) {
    fs.readFile('./content/_ending_form_files.htm', function (err, data) {
        if (err) return res.json({error : err});
        var s_str = ("" + data).split('<!-- LOOP -->')[0];
        var e_str = ("" + data).split('<!-- LOOP -->')[1];

        var html = "<form id=\"submitnarrative\" action=\"create\" method=\"POST\">";

        var count = 1;

        for (var key in map) {
            if (key == "start" || key == "_exit" || key == "outtr") continue;

            html += "<div style=\"height: 717px;\" class=\"slide" + count + " slide\">\r\n"
            html += "<div class=\"content-frame\">\r\n"

            html += "<input type=\"textarea\" name='" + key + "' class='narrator-subtitle' /><br>\r\n"
            html += "<iframe src=\"content/" + key + "\" width=\"100%\" height=\"100%\" frameBorder='0'></iframe>\r\n"

            html += "</div>\r\n"
            html += "</div>"

            count++
        }

        html += "</form>"

        var string = s_str + html + e_str;

        res.write(string);
        res.end();
    });
}

module.exports.embed = function (req, res) {
        var narrative = req.session.narrative;

	fs.readFile('./content/' + map[req.params.pgsrc].file, function (err, data) {
		if (err) return res.json({error : err});
                var string = "" + data;

/*                if (narrative[req.session.page].image)      string = string.replace("--IMAGEVALUE--", narrative[req.session.page].image);
                if (narrative[req.session.page].narrative)  string = string.replace("--REPLACE--", narrative[req.session.page].narrative);*/

                if (narrative[req.params.pgsrc].image)      string = string.replace("--IMAGEVALUE--", narrative[req.params.pgsrc].image);
                if (narrative[req.params.pgsrc].narrative)  string = string.replace("--REPLACE--", narrative[req.params.pgsrc].narrative);

		res.write(string);
                res.end();
        });
}

module.exports.retrieve = function (req, res) {
        var s = req.session;

        if (s.page == null) s.page = 'start';
        if (s.narrative == null) s.narrative = nar.default;
        if (s.page == "start") return res.sendfile(map[s.page].file, {root : 'content'});
        if (s.page == "_exit") return createnarrativeget(req, res);
        if (s.page == "outtr") {
            s.page = "_exit";
            return res.sendfile(map["outtr"].file, {root: 'content'});
        }

        console.log(s.page);
        var html = "<html><head><link rel='stylesheet' type='text/css' href=\"/content/choose.css\"></style></></head><body><iframe src=\"content/";
        if (s.page == null) s.page = "start";
        html += s.page + "\" width=\"100%\" height=\"100%\" frameBorder=\"0\"></iframe>";
	html += "<div style=\"position : absolute; bottom : 0; left : 0; opacity: .8\"><span><form name=\"morgan\" action=\"/\" method=\"POST\">";

        html += "<div class='button-holder'>"
        html += "<button class=\"choice1\" type=\"submit\" name=\"choice\" value=\"0\">" + map[s.page]['zed'] + "</button>";
        html += "<button class=\"choice2\" type=\"submit\" name=\"choice\" value=\"1\">" + map[s.page]['one'] + "</button>";
        html += "<button class=\"choice3\" type=\"submit\" name=\"choice\" value=\"2\">" + map[s.page]['two'] + "</button><br>";


        html += "</div>"

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

module.exports.createnarrativeget = createnarrativeget;

module.exports.createnarrativepost = function (req, res) {

}
