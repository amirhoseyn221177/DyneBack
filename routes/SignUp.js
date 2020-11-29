const express = require('express')
const router = express.Router()
const { User } = require('../MongodDB/models')
const bcrypt = require('bcrypt')
const Error = require('../ErrorHandling/Error')
const salt = 12


router.post('/creat', async (req, res) => {
    try {
        let { email, password, displayName, phone, role } = await req.body
        if (password.length < 6) {
            res.status(400).json({ erorr: "your password is too short" })
        } else {
            const genedsalt = await bcrypt.genSalt(salt, e => Error(e))
            const hashed = await bcrypt.hash(password, genedsalt, e => Error(e))
            await User.create({ email: email, password: bcrypt.hashed, displayName: displayName, phone: phone, role: role })
        }
    } catch (e) {

    }

})