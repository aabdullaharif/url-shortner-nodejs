const express = require('express');
const { handleGeneratedShortURL, handleRedirection, handleAnalytics } = require('../controllers/url');
const { restrictToLoginUserOnly } = require('../middlewares/auth');


const router = express.Router();

router.post('/url',restrictToLoginUserOnly, handleGeneratedShortURL);
router.get('/url/:shortId',restrictToLoginUserOnly, handleRedirection);
router.get('/analytics/:shortId',restrictToLoginUserOnly, handleAnalytics);

module.exports = router;