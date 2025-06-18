const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Authentication token is required' });
    }

    const isBlacklisted = await userModel.findOne({token : token})
    if (isBlacklisted){
        return res.status(401).json({message : 'Unauthorized login attempt'})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //console.log(decoded)
        const user = await userModel.findById(decoded._id)

        req.user = user
        return next()

    }
    catch(error){
        return res.status(401).json({message : 'Some problem in token decoding'})
    }
}