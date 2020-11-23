var mongoose = require('mongoose');

//require chalk module to give colors to console text
var chalk = require('chalk');

//require database URL from properties file
const url = 'mongodb://localhost:27017'

//export this function and imported by server.js
mongoose.connect(url, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log(chalk.red("we are connected"))
})
const allSchemas = () => {
    const user = mongoose.Schema({
        email: { type: String, required: true, unique: true },
        photoUrl: String,
        displayName: String,
        bio: String,
        LastLocation: {
            Latitude: Number, Longtitude: Number
        },
        lastTime: Date,
        friends: String,
        phone: {type:String,required:true,unique:true},
        meetups: String,
        rating: Number,
        points: Number,
        referralUid: String
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
        meetUpProgress: ['AwaitingResponse', 'PendingReschedule', 'Accepted', 'Declined', 'Confirmed', 'Cancelled'],
        hostId: String,
        hostName: String,
        hostPhotoUrl: String,
        restaurantId: String,
        timeOfMeet: Date,
        timeOfCreation: Date,
        duration: Number,
        isHost: Boolean,
        qrInput: String,
        accept: { type: Map, of: String },
        isConfirmed: Boolean
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
        hasDelivery: {type:Boolean,default:false},
        isFavorite: Boolean,
        localPopularity: Number,
        openNow: Boolean,

    })
    mongoose.model("restaurant", restaurant)

}

allSchemas()
module.exports = mongoose


