const express = require('express');
const blogController = require('../controllers/sportsfeedController');

const router = express.Router();

router.get('/SportsFeed', blogController.get_sports_feed);
module.exports = router;