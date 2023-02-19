const User = require('../models/user');
const { setUser } = require('../config/auth');

const handleUserSignup = async (req, res)=>{
    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password
    });

    return res.redirect('/');
};

const handleUserLogin = async (req, res)=>{
    const { email, password } = req.body;

    const user = await User.findOne({
        email,
        password
    });

    if(!user){
        return res.redirect('back')
    }

    const token = setUser(user);

    res.cookie('uuid', token);
    return res.redirect('/');
}


module.exports ={
    handleUserSignup,
    handleUserLogin
}