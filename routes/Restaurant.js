const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const router = require('./SignUp')
const { Restuarant } = require('../MongodDB/models')


route.post('/addrestuarant', async (req, res) => {
    try {
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


router.get('/getMenu/:id',async(req,res)=>{
    try{
    }catch(e){
        console.log(e)
        res.status(401).json({message:"sorry there is an error finding this restaurant"})
    }

})