const express = require('express');

const router = express.Router();

const homecontroller = require('../controllers/homecontroller');

router.get('/',homecontroller.home);
router.post('/getdetails',homecontroller.details);
module.exports = router;