const Dragon = require('../models/dragon');

// List of all Dragons (API - Part 5)
exports.dragon_list = async function(req, res) {
    try {
        const theDragons = await Dragon.find();
        res.send(theDragons);
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);
    }
};

// Handle a show all dragons view (Part 6)
exports.dragon_view_all_Page = async function(req, res) {
    try {
        const theDragons = await Dragon.find();
        res.render('dragon', { title: 'Dragon Search Results', results: theDragons });
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);
    }
};

// Handle Dragon create on POST (Part 7)
exports.dragon_create_post = async function(req, res) {
    console.log(req.body);
    let document = new Dragon();
    document.kind = req.body.kind;
    document.wings = req.body.wings;
    document.teeth = req.body.teeth;
    try {
        let result = await document.save();
        res.send(result);
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);
    }
};

// Handle a specific dragon detail/inspect view (Part 8)
exports.dragon_detail = async function(req, res) {
    console.log("detail " + req.query.id);
    try {
        let result = await Dragon.findById(req.query.id);
        res.render('dragondetail', { title: 'Dragon Detail', toShow: result });
    } catch (err) {
        res.status(500).send(`{'error': '${err}'}`);
    }
};

// Stubs for other actions
exports.dragon_delete = function(req, res) {
    res.status(500).send('NOT IMPLEMENTED: Dragon delete');
};

exports.dragon_update_put = function(req, res) {
    res.status(500).send('NOT IMPLEMENTED: Dragon update');
};