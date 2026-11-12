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

// PART 1: Get for a specific Dragon by ID (API)
exports.dragon_detail = async function(req, res) {
    console.log("detail " + req.params.id);
    try {
        let result = await Dragon.findById(req.params.id);
        if (!result) {
            return res.status(404).send(`{"error": "Document for id ${req.params.id} not found"}`);
        }
        res.send(result);
    } catch (error) {
        res.status(500).send(`{"error": "document for id ${req.params.id} not found"}`);
    }
};

// PART 2: Handle Dragon update form on PUT (API)
exports.dragon_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
    try {
        let toUpdate = await Dragon.findById(req.params.id);
        if (!toUpdate) {
            return res.status(404).send(`{"error": "Dragon not found for id ${req.params.id}"}`);
        }
        
        // Update properties if provided in request body
        if (req.body.kind) toUpdate.kind = req.body.kind;
        if (req.body.wings !== undefined) {
            toUpdate.wings = req.body.wings === 'true' || req.body.wings === true;
        }
        if (req.body.teeth) toUpdate.teeth = req.body.teeth;

        let result = await toUpdate.save();
        console.log("Success " + result);
        res.send(result);
    } catch (err) {
        res.status(500).send(`{"error": "${err}: Update for id ${req.params.id} failed"}`);
    }
};

// Handle Dragon delete on DELETE (API)
exports.dragon_delete = async function(req, res) {
    console.log("delete " + req.params.id);
    try {
        let result = await Dragon.findByIdAndDelete(req.params.id);
        console.log("Removed " + result);
        res.send(result);
    } catch (err) {
        res.status(500).send(`{"error": Error deleting ${err}}`);
    }
};