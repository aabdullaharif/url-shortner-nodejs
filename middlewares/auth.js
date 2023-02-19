const { getUser } = require('../config/auth');

const restrictToLoginUserOnly = (req, res, next)=>{
    const userUid = req.cookies.uuid;

    if(!userUid) return res.redirect('/user/login');

    const user = getUser(userUid);

    if(!user) return res.redirect('/user/login');

    req.user = user;

    next();
}

const authCheck = (req, res, next)=>{
    const userUid = req.cookies.uuid;

    if(!userUid) return res.redirect('/user/login');

    const user = getUser(userUid);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoginUserOnly,
    authCheck
}