const URL = require('../models/url');
var shortid = require('shortid');


const handleGeneratedShortURL = async (req, res) =>{
    const body = req.body;

    if(!body.url) return res.status(400).json({ error: 'url is required'})

    const shortID = shortid();

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    });

    return res.render('home',{
        id: shortID
    })

    // return res.json({ id: shortID });
};

const handleRedirection = async (req, res)=>{
    const shortId = req.params['shortId'];
    const entry = await URL.findOneAndUpdate(
        {
        shortId,
        },
        {
        $push: {
            visitHistory: {
            timestamp: Date.now(),
            },
        },
        }
        ); 
        res.redirect(entry.redirectURL);
}

const handleAnalytics = async (req, res)=>{
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

module.exports ={
    handleGeneratedShortURL,
    handleRedirection,
    handleAnalytics
}