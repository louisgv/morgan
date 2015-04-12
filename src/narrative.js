var db = require('./db');

var collection = module.exports.db = db.get('narrativecollection');

module.exports.default = {
    'start' : { narrative: 'This is the start' },
    'dispa' : { narrative: 'Entrepeneur\'s amazing house brings wealth to poor neighborhood', image: 'richpoor.jpg' },
    'strat' : { narrative: 'New business district to increase population', image: 'gentrify.jpg' },
    'rpoor' : { narrative: 'Poor get help finding new homes outside the city', image: 'poor.jpg' },
    'event' : { narrative: 'Community get together during hard times', image: 'event.jpg' },
    'fbook' : { narrative: 'Poor communities protest demolition of large apartment complexes' },
    'sprot' : { narrative: 'Protestors picket, blocking street access and slowing traffic', image: 'sprot.jpg' },
    'nytim' : { narrative: 'Officials say protestors leaving garbage behind for community' },
    'spro2' : { narrative: 'Crowds surge as city debate rages', image: 'justice.jpg' },
    '3prot' : { narrative: 'Dissident voices cry above the volume of the masses', image: 'medium.jpg' },
    '3pigs' : { narrative: 'Officers provide safe area for pedestrians amid confusion', image: 'occupy5.jpg' },
    '3twit' : { narrative: 'Family man and police officer hurt by gang in city movement' },
    '3pig2' : { narrative: 'Police defend detainment of agitators', image: 'riot.jpg' },
    '3viol' : { narrative: 'As dissent grows, radicals find home', image: 'fire.jpg' },
    '3blog' : { narrative: 'Business says foreclosure due to downtown activity' },
    '3riot' : { narrative: 'State police aid as city calls for help', image: 'brutality.jpg' },
    '3cage' : { narrative: 'Dangerous firebrands contained by civil police force', image: 'gates.jpg' },
    '1prot' : { narrative: 'More people are joining in every day', image: 'medium.jpg' },
    '1pigs' : { narrative: 'We are being blocked by the police so our movement can\'t get visibility', image: 'occupy5.jpg' },
    '1twit' : { narrative: 'Protestor sent home with broken arm, bruises' },
    '1pig2' : { narrative: 'Cops detain protestor who wanders from crowd', image: 'riot.jpg' },
    '1viol' : { narrative: 'Movement growth places it in national headlines', image: 'fire.jpg' },
    '1blog' : { narrative: 'Provost compares campaign with civil movement' },
    '1riot' : { narrative: 'City fires anti-riot rounds into crowd', image: 'brutality.jpg' },
    '1cage' : { narrative: 'Citizen speech blocked by gates and police', image: 'gates.jpg' },
    'outtr' : { narrative: 'You\'ve been manipulated.', image: 'image.jpg' },
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
