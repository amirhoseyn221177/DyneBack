const mongoose = require("./DBSetup");

let Restuarant = mongoose.model('restaurant')
let User = mongoose.model('User')
let Cuisine = mongoose.model('Cuisine')
let Message = mongoose.model('message')
let MeetUp = mongoose.model('meetUp')

module.exports = { 
    User: User, 
    Restuarant: Restuarant,
    Cuisine: Cuisine, 
    Message: Message, 
    MeetUp: MeetUp }
