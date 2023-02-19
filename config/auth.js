const jwt = require('jsonwebtoken');

const setUser =(user)=>{
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, process.env.JWT_SECRET_KEY)
}

const getUser = (token)=>{

    if(!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

module.exports ={
    setUser,
    getUser
}