const express = require('express')
const router = express.Router()
const {MeetUp} = require('../MongodDB/models')
const Error = require('../ErrorHandling/Error')

router.post('/create', async (req, res) => {
    try {
        const meetup = new MeetUp(req.body)
        await meetup.save(e => Error(e))
        const all = await MeetUp.find({}, e => Error(e)).exec()
        console.log(all)
    } catch (e) {
        console.log(e)
    }
})

router.delete('/deleteall', async (req, res) => {
    await MeetUp.deleteMany({}, e => Error(e))
    const all = await MeetUp.find({}, e => Error(e))
    console.log(all)
})


router.get('/get/:id', async (req, res) => {
    const meetUp = await MeetUp.findById({_id: req.params.id}, e => Error(e))
})


router.delete('/delete/:id', async (req, res) => {
    await MeetUp.deleteOne({_id: id}, e => Error(e))
})


router.get('/getbyuser/:id', async (req, res) => {
    try {
        // const user = await MeetUp.find({
        //     $or: [{ hostId: req.params.id },
        //     {
        //         accept: {
        //             Confirmed: { $in: [req.params.id] }
        //         }
        //     }]
        // }, e => Error(e))
        // console.log(user.length)
        const user = await MeetUp.find({'accept.Confirmed': {$in: [req.params.id]}})
        console.log(user.length)
    } catch (e) {
        console.log(e)
    }
})


router.get('/getall', async (req, res) => {
    const all = await MeetUp.find({}).exec()
    all.map(x => {
        console.log(x.accept.Confirmed)
    })
})


module.exports = router