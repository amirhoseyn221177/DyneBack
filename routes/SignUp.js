const express = require('express')
const router = express.Router()
const { User } = require('../MongodDB/models')
const bcrypt = require('bcrypt')
const { Key } = require('../AuthenticationKey/AuthKey')
const jwt = require('jsonwebtoken')
const Error = require('../ErrorHandling/Error')
const { gettingUserByEmail } = require('../MongodDB/AllFunctions')
const salt = 12


router.post('/create', async (req, res) => {
    try {
        let { email, password, displayName, phone, role } = await req.body
        if (password.length < 6) {
            res.status(400).json({ erorr: "your password is too short" })
        } else {
            const genedsalt = await bcrypt.genSalt(salt)
            const hashed = await bcrypt.hash(password, genedsalt)
            await User.create({ email: email, password: hashed, displayName: displayName, phone: phone, role: role })
            res.json({message:"your account has been created"})
        }
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ status: "we can't create your account" })
    }

})

router.get('/getall', async (req, res) => {
    try {
        const all = await User.find({}, e => Error(e))
        res.json(all)
    } catch (e) {
        console.error(e)

    }
})

router.delete('/delete', async (req, res) => {
    await User.deleteMany({})
})

router.get('/login/:email', async (req, res) => {
    try {
        const user = await gettingUserByEmail(req.params.email)
        if (user) {
            let hashedPass = await user.password
            let result = await bcrypt.compare(req.body.password, hashedPass)
            if (result) {
                let token = jwt.sign({ username: req.params.email, role:user.role}, Key, {
                    algorithm: "HS256",
                    expiresIn: 7200
                })
                res.status(200)
                .cookie(token)
                .json({message:"succesful"})
                .end()
            }

        } else {
            throw new Error("the password is wrong ")
        }
    } catch (e) {
        console.error(e)
        res.status(401).json({message:"there is problem with your password"})
    }
})



module.exports = router;