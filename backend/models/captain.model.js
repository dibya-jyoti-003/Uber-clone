const mongoose = require('mongoose')

const captainSchema = new mongoose.Schema({
    fullname : {
        firstname :{
            type: String,
            required : true,
            minlength : [3,'Must be atleast 3 characters long']
        },
        lastname : {
            type : String, 
            minlength : [3, 'lastname must be 3 characters long']
        },
        email : {
            type: String,
            required : true ,
            unique : true ,
            match : [/^\S+@\S+\.\S+$/ ,'Please enter a valid email']
        },
        password : {
            type : String,
            required: true, 
            select : false
        },
        socketId : {
            type : String
        },
        status : {
            type : String, 
            enum : ['active', 'inactive'],
            default : 'active'
        },
        vehicle : {
            color : {
                type : String,
                required : true,
                minlength : [3, 'Enter valid color of vehicle ']
            },
            plate : {
                type : String,
                required : true,
                minlength : [3, 'Invalid plate number']
            },
            capacity : {
                type : Number,
                required : true,
                minlength : [1, ' Capacity must be more than 0']
            },
           
        }
    }
}) 