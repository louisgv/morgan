var db = require('./db');

var collection = module.exports.db = db.get('narrativecollection');

module.exports.default = {
    'start' : { narrative: 'This is the start' },
    'dispa' : { narrative: 'There is a lot of disparity', image: 'richpoor.jpg' },
    'strat' : { narrative: 'Stratification is high', image: 'gentrify.jpg' },
    'rpoor' : { narrative: 'Poor getting poorer', image: 'poor.jpg' },
    'event' : { narrative: 'Shocking events happen', image: 'event.jpg' },
    'fbook' : { narrative: 'Shocking events happen' },
    'nlike' : { narrative: 'Boo, this is lame', image: 'image.jpg' },
    'ylike' : { narrative: 'Finally time that the news shows this happening', image: 'image.jpg' },
    'sprot' : { narrative: 'Protestors are gathering', image: 'sprot.jpg' },
    'nytim' : { narrative: 'Protestors are gathering' },
    'spro2' : { narrative: 'Protestors are gathering', image: 'justice.jpg' },
    '3prot' : { narrative: 'The protestors are restless and numerous', image: 'medium.jpg' },
    '3pigs' : { narrative: 'The police are here to save the day', image: 'occupy5.jpg' },
    '3twit' : { narrative: 'Police to unblock the streets from meddling protestors' },
    '3pig2' : { narrative: 'The police keep people in line', image: 'riot.jpg' },
    '3viol' : { narrative: 'The hooligans are being kept in line', image: 'fire.jpg' },
    '3blog' : { narrative: 'The hooligans are being kept in line' },
    '3riot' : { narrative: 'Rioters block the streets in business district', image: 'brutality.jpg' },
    '3cage' : { narrative: 'Violent protestors met by peaceful police', image: 'gates.jpg' },
    '1prot' : { narrative: 'The protestors are restless and numerous', image: 'medium.jpg' },
    '1pigs' : { narrative: 'The police are here to save the day', image: 'occupy5.jpg' },
    '1twit' : { narrative: 'Police to unblock the streets from meddling protestors' },
    '1pig2' : { narrative: 'The police keep people in line', image: 'riot.jpg' },
    '1viol' : { narrative: 'The hooligans are being kept in line', image: 'fire.jpg' },
    '1blog' : { narrative: 'The hooligans are being kept in line' },
    '1riot' : { narrative: 'Rioters block the streets in business district', image: 'brutality.jpg' },
    '1cage' : { narrative: 'Violent protestors met by peaceful police', image: 'gates.jpg' },
    '1died' : { narrative: 'Nobody wants to protest if it isnt nice out', image: 'image.jpg' },
    '3died' : { narrative: 'Nobody wants to protest if it isnt nice out', image: 'image.jpg' },
    '_exit' : { narrative: 'You\'ve been manipulated. Now it is your turn', image: 'image.jpg' }
}

module.exports.newnarrative = function (cb) {
    var narrative = {
    'start' : { narrative: '' },
    'dispa' : { narrative: '', image: 'richpoor.jpg' },
    'strat' : { narrative: '', image: 'gentrify.jpg' },
    'rpoor' : { narrative: '', image: 'poor.jpg' },
    'event' : { narrative: '', image: 'event.jpg' },
    'fbook' : { narrative: '' },
    'nlike' : { narrative: '', image: 'image.jpg' },
    'ylike' : { narrative: '', image: 'image.jpg' },
    'sprot' : { narrative: '', image: 'sprot.jpg' },
    'nytim' : { narrative: '' },
    'spro2' : { narrative: '', image: 'justice.jpg' },
    '3prot' : { narrative: '', image: 'medium.jpg' },
    '3pigs' : { narrative: '', image: 'occupy5.jpg' },
    '3twit' : { narrative: '' },
    '3pig2' : { narrative: '', image: 'riot.jpg' },
    '3viol' : { narrative: '', image: 'fire.jpg' },
    '3blog' : { narrative: '' },
    '3riot' : { narrative: '', image: 'brutality.jpg' },
    '3cage' : { narrative: '', image: 'gates.jpg' },
    '1prot' : { narrative: '', image: 'medium.jpg' },
    '1pigs' : { narrative: '', image: 'occupy5.jpg' },
    '1twit' : { narrative: '' },
    '1pig2' : { narrative: '', image: 'riot.jpg' },
    '1viol' : { narrative: '', image: 'fire.jpg' },
    '1blog' : { narrative: '' },
    '1riot' : { narrative: '', image: 'brutality.jpg' },
    '1cage' : { narrative: '', image: 'gates.jpg' },
    '1died' : { narrative: '', image: 'image.jpg' },
    '3died' : { narrative: '', image: 'image.jpg' },
    '_exit' : { narrative: '', image: 'image.jpg' }
    }

    cb(narrative);
}

module.exports.savenarrative = function (session, narrative) {
    if (session.id == null) session.id = new ObjectId();
    if (session.resultid == null) session.resultid = new ObjectId();
    if (session.narrativeid == null) session.narrativeid = new ObjectId();
    collection.update({_id: session.id}, {_id: session.id, session: session, narrative: narrative}, {upsert: true});
}

module.exports.loadnarrative = function (id, cb) {
    collection.findOne({_id: id}, function (err, doc) {
        if (err) return res.json({error : err});
        cb(doc);
    });
}
