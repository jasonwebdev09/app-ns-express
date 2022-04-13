const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()



router.post('/users/signup', async (req, res) => {
    const user = new User(req.body)
    try {
        const existingUser = await User.findOne({ username: req.body.username })
        if (existingUser) {
            return res.send({ error: 'username is already taken' })
        }
        
        await user.generateAuthToken()
        await user.save()
        res.status(201).send({ message: 'Success' })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        console.log(user, token)
        res.send({ user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users/logout', async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        req.logout();
        res.redirect('http://localhost:3000/');
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/users/current_user', (req, res) => {
    try {
        res.send({
            user: req.user,
            token: req.user.tokens[0].token
        })
    } catch (e) {
         res.send() 
    }
})

router.get('/users', async (req, res) => {
    try {
        const allUsers = await User.find({})
        res.send(allUsers)
    } catch (e) {
        res.send({ users: '' })
    }
})

router.get('/users/:id', async (req, res) => {
    try {
        const singleUser = await User.findById(req.params.id)
        res.send(singleUser)
    } catch (e) {
        res.status(404).send({ error: 'not found'})
    }
})

router.patch('/users/me', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['first_name', 'last_name', 'email', 'position', 'college', 'department']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['first_name', 'last_name', 'email', 'position', 'college', 'department']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }
    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})



module.exports = router