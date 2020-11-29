var mongoose = require('mongoose');

//require chalk module to give colors to console text
var chalk = require('chalk');

//require database URL from properties file
const url = 'mongodb://localhost:27017'

//export this function and imported by server.js
mongoose.connect(url, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false }, () => {
    console.log(chalk.red("we are connected"))
})
const allSchemas = () => {
    const user = mongoose.Schema({
        email: { type: String, required: true, unique: true },
        photoUrl: String,
        displayName: { type: String, required: true },
        bio: { type: String, default: '' },
        LastLocation: {
            Latitude: Number, Longtitude: Number
        },
        password: { type: String, required: true },
        lastTime: Date,
        friends: { type: [String], required: true, default: [] },
        phone: { type: String, required: true, unique: true },
        meetups: String,
        rating: Number,
        points: Number,
        referralUid: String,
        role: { type: String, required: true }
    })
    mongoose.model('User', user)

    const Cuisine = mongoose.Schema({
        cuisineType: [
            'All',
            'African',
            'American',
            'Arabic',
            'Asian',
            'Bakery',
            'Beer',
            'Beverages',
            'Breakfast',
            'Canadian',
            'Chinese',
            'Cafe',
            //  Coffee,
            'Comfort',
            'Cuban',
            'Dessert',
            'Drinks',
            'EastEurope',
            'FastFood',
            'Filipino',
            'French',
            'German',
            'Greek',
            'Indian',
            'Italian',
            'Japanese',
            'Korean',
            'Latin',
            'Lebanese',
            'Malaysian',
            'Mediterranean',
            'Mexican',
            //  MiddleEastern,
            'Modern',
            'Persian',
            'Pizza',
            'Seafood',
            'Singaporean',
            'Steak',
            'Thai',
            'Vegan',
            'Vietnamese'],
        title: String,
        imageUrl: String,
        isFavCuisine: Boolean,

    })
    mongoose.model('Cuisine', Cuisine)
    const meetUp = mongoose.Schema({
        hostId: { type: String, required: true },
        hostName: { type: String, required: true },
        hostPhotoUrl: String,
        restaurantId: { type: String, required: true },
        timeOfMeet: { type: Number, required: true },
        timeOfCreation: { type: Number, default: Date.now() },
        duration: { type: Number, required: true },
        isHost: { type: Boolean, default: true },
        qrInput: { type: String, defailt: Math.random(100, 1000) },
        accept: {
            "Accepted": [String],
            "AwaitingResponse": [String],
            "PendingReschedule": [String],
            "Declined": [String],
            "Confirmed": [String],
            "Canceled": [String]
        },
        isConfirmed: { type: Boolean, default: false },
    })
    mongoose.model("meetUp", meetUp)

    const message = mongoose.Schema({
        senderUid: String,
        senderName: String,
        receiverUid: String,
        type: String,
        message: String,
        timeStamp: Date,
        photoUrl: String
    })
    mongoose.model('message', message)

    const restaurant = mongoose.Schema({
        cuisines: [],
        name: { type: String, required: true },
        imageUrl: String,
        websiteUrl: String,
        phoneNumber: Number,
        address: String,
        city: String,
        Affordability: { type: String, enum: ["Affordable", "Pricey", "Luxury"] },
        isGlutenFree: Boolean,
        isVegetarian: Boolean,
        hasPickup: Boolean,
        hasEatIn: Boolean,
        hasPatio: Boolean,
        hasDelivery: { type: Boolean, default: false },
        isFavorite: Boolean,
        localPopularity: Number,
        openNow: Boolean,

    })
    mongoose.model("restaurant", restaurant)

}

allSchemas()
module.exports = mongoose


