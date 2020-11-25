const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')


route.post('/addrestuarant', async (req, res) => {
    try {
        let Restuarant = mongoose.model("restaurant")

        let restaurant = new Restuarant(req.body)
        await restaurant.save(() => {
            console.log("it is saved")
        })
    } catch (e) {

    }
})


route.post('/getall', async (req, res) => {
    try {
        const allRes = await Restuarant.find({})
        console.log(allRes)
    } catch (e) {
        console.log(e)
    }
})


route.post(`/getrestuarant/:id`, async (req, res) => {
    try {
        let Restuarant = mongoose.model("restaurant")

        let restaurant = await Restuarant.findById(parseInt(req.params.id)).exec((err, res) => {
            if (err) console.log(`there is an error getting this restuarant ${err}`)
            else {
                console.log("found the restuarant")
            }
        })
        console.log(restaurant)
    } catch (e) {
        console.error(e)
    }
})


route.post(`/deleterestuarant/:id`, async (req, res) => {
    try {
        let Restuarant = mongoose.model("restaurant")

        await Restuarant.deleteOne({id: parseInt(req.params.id)}, (err) => {
            if (err) console.log(err)
            else {
                console.log("this restuarant is deleted ")
            }
        })
    } catch (e) {
        console.log(e)
    }
})