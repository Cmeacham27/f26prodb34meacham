var Costume = require('../models/costume');

// List of all Costumes (Updated for Part 6)
exports.costume_list = async function(req, res) {    
    try {
        const theCostumes = await Costume.find();
        res.render('costumes', { title: 'Costume Search Results', results: theCostumes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// (Keep your other stub functions below this as they are until later parts of your assignment)
exports.costume_detail = function(req, res) {    
    res.send('NOT IMPLEMENTED: Costume detail: ' + req.params.id);
};

exports.costume_create_post = function(req, res) {    
    res.send('NOT IMPLEMENTED: Costume create POST');
};

exports.costume_delete = function(req, res) {    
    res.send('NOT IMPLEMENTED: Costume delete DELETE ' + req.params.id);
};

exports.costume_update_put = function(req, res) {    
    res.send('NOT IMPLEMENTED: Costume update PUT' + req.params.id);
};