var db = require('./db');

var collection = module.exports.db = db.get('uniquecollection');

module.exports.addunique(session) {
    if (session.id == null) session.id = new ObjectId();
    collection.update({_id : session.id}, {_id : session.id, session: session}, {upsert: true});
}

module.export.savesession(session) {
    if (session.id == null) session.id = new ObjectId();
    collection.update({_id : session.id}, {_id : session.id, session: session}, {upsert: true});
}
