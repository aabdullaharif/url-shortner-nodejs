const express = require('express');
const URL = require('../models/url');
const { authCheck } = require('../middlewares/auth');

const router = express.Router();

router.get('/', authCheck, async (req, res)=>{

    if(!req.user) return res.redirect('/user/login');

    const allUrls = await URL.find({ createdBy: req.user._id });
    res.render('home',
    {
        urls: allUrls
    })

});

router.get('/user/signup', (req, res)=>{
    res.render('signup');
});

router.get('/user/login', (req, res)=>{
    res.render('login');
});

router.get('/url/delete/:id', (req, res)=> {
    URL.findByIdAndRemove(req.params.id, (err) => {
        if (!err) {
            res.redirect('back');
        } else {
            console.log('Failed to Delete user Details: ' + err);
        }
    });
});

module.exports = router;
