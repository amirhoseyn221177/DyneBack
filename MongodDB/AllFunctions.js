const e = require('express')
const mongoose = require('mongoose')
const Error = require('../ErrorHandling/Error')
const { User, Restuarant, Cuisine, MeetUp } = require('./models')

const gettingUserByEmail = async (email) => {
    return await User.findOne({ email: email }, e => Error(e)) 
}









module.exports = { gettingUserByEmail: gettingUserByEmail }