const express = require('express')
const router = express.Router()
const { MeetUp } = require('../MongodDB/models')
const Error = require('../ErrorHandling/Error')

router.post('/create', async (req, res) => {
    try {
        const meetup = new MeetUp(req.body)
        await meetup.save(e => Error(e))
        res.status(200).json({ message: 'succesful', meetUp: meetup })
    } catch (e) {
        console.log(e)
        res.status(401).json({ message: "creating this group was unsuccesful" })
    }
})

router.delete('/deleteall', async (req, res) => {
    await MeetUp.deleteMany({}, e => Error(e))
    const all = await MeetUp.find({}, e => Error(e))
    console.log(all)
})


router.get('/get/:id', async (req, res) => {
    const meetUp = await MeetUp.findById({ _id: req.params.id }, e => Error(e))
    res.json({meetup:meetUp})
})


router.delete('/delete/:id', async (req, res) => {
    try {
        await MeetUp.deleteOne({ _id: req.params.id })

    } catch (e) {

        res.status(400).json({ message: "unsucceful to delete the meetup", e: e.message })
    }
})


router.get('/getbyuser/:id', async (req, res) => {
    try {
        const user = await MeetUp.find({
            $or: [{ hostId: req.params.id },
            {
                accept: {
                    Confirmed: { $in: [req.params.id] }
                }
            }, { 'accept.Confirmed': { $in: [req.params.id] } }]
        })
        res.json({ message: "all the meeting for this user", meetings: user })
    } catch (e) {
        console.log(e)
    }
})


router.get('/getall', async (req, res) => {
    const all = await MeetUp.find({}).exec()
    res.json({ data: all })
})


router.put('/confirm/:id', async (req, res) => {
    try {
        await MeetUp.updateOne({ _id: req.params.id }, {
            $addToSet: { "accept.Confirmed": req.body.user },
            $pull: { "accept.AwaitingResponse": req.body.user }
        }, e => Error(e))
        const query = await MeetUp.findById({ _id: req.params.id })
        res.json(query)

    } catch (e) {
        console.log(e)
    }

})

router.put('/declined/:id', async (req, res) => {
    try {
        await MeetUp.updateOne({ _id: req.params.id }, {
            $addToSet: { "accept.Declined": req.body.user },
            $pull: { "accept.AwaitingResponse": req.body.user }
        }, (e, query) => {
            Error(e)
            res.json(query)
        })
    } catch (e) {
        console.error(e)
    }
})

router.get('/getmeetup/:id', async (req, res) => {
    try {
        const meetUp = await MeetUp.findById({ _id: req.params.id }, e => Error(e))
        console.log(meetUp)
    } catch (e) {
        console.log(e)
    }

})


router.get('/people/:id', async (req, res) => {
    try {
        const allPeople = await MeetUp.findById({ _id: req.params.id }, e => Error(e))
        res.json(allPeople)
    } catch (e) {
        console.log(e)
    }
})

router.put('/kickout/:id/:host/:member', async (req, res) => {
    try {
        let { id, host, member } = req.params
        if (host !== member) {
            let newMeetUp = await MeetUp.findOneAndUpdate({ _id: id, hostId: host }, { 
                $pull: { "accept.AwaitingResponse": member },
                $inc:{"users":-1}
             }, { new: true })
            res.status(200).json({ message: " user deleted", message: newMeetUp })
        }

    } catch (e) {
        console.log(e)
        res.status.json({ message: "sorry we are unable to do this action" })
    }
})

router.put('/add/:id/:host/:member', async (req, res) => {
    try {
        let { id, host, member } = req.params
        if (host !== member) {
            let newMeetUp = await MeetUp.findOneAndUpdate({ _id: id, hostId: host},{
                $addToSet:{"accept.AwaitingResponse":member},
                $inc:{"users":1}
            },{new:true})
            res.status(200).json({ data: newMeetUp })
        }
    } catch (e) {
        console.log(e)
    }
})










module.exports = router