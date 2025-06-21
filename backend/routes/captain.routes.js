
const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const captainController = require('../controller/captain.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/register' , [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('Firstname should be atleast 3 chars long'),
    body('fullname.lastname').isLength({min:3}).withMessage('Lastname should be atleast 3 chars long'),
    body('password').isLength({min:6}).withMessage('Password should be atleast 6 chars long'),    
    body('vehicle.color').isLength({min:3}).withMessage('Color should be atleast 3 chars long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate should be atleast 3 chars long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity should be more than 0'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid Vehicle Types')
],
    captainController.registerCaptain
)

router.post('/login' , [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long ')
],
captainController.loginCaptain
)

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)

module.exports = router