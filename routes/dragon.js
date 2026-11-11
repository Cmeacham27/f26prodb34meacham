var express = require('express');
const dragon_controllers = require('../controllers/dragon');
var router = express.Router();

/* GET dragons view page */
router.get('/', dragon_controllers.dragon_view_all_Page);

/* GET detail dragon page */
router.get('/detail', dragon_controllers.dragon_detail);

module.exports = router;