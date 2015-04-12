var db = require('./db');

var collection = module.exports.db = db.get('resultcollection');

module.exports.createresult = function(map, cb) {
    var result = {}

    for (var key in map) result[key] = -1

    cb(result)
}

module.exports.saveresults = function(session, results, cb) {
    if (session.id == null) session.id = new ObjectId();
    if (session.resultid == null) session.resultid = new ObjectId();
    if (session.narrativeid == null) session.narrativeid = new ObjectId();
    collection.update({_id: session.id}, {_id: session.id, session: session, results: results}, {upsert: true});
}

module.exports.loadresults(id, cb) {
    collection.findOne({_id: id}, function (err, doc) {
        if (err) return res.json({error : err});
        cb(doc);
    });
}
