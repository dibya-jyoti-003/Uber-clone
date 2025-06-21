const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model')

module.exports.authUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Authentication token is required' });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({token : token})
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

module.exports.authCaptain = async (req,res,next) => {

    const token = req.cookies.token || req.header.authorization?.split(' ')[1]

    if (!token){
        return res.status(400).json({message : 'Unauthorized'})
    }

    const isBlacklisted = await blacklistTokenModel.findOne({token : token})

    if (isBlacklisted){
        return res.status(401).json({message : 'Unauthorized'})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //console.log(decoded)
        const captain = await captainModel.findById(decoded._id)

        req.captain = captain
        return next()

    }
    catch(error){
        return res.status(401).json({message : 'Some problem in token decoding'})
    }

}