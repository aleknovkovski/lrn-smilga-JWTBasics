const customAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

async function login (req, res) {
    const { username, password } = req.body;
    if(!username || !password) {
        throw new customAPIError('Please provide a username and password', 400)
    }

    const id = new Date().getDate() // just for demo, irl provided by db
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })

    res.status(200).json({ msg: 'user created', token })
}

async function dashboard (req, res) {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new customAPIError('please provide an access token', 401)
    }

    const luckyNumber = Math.floor(Math.random() * 100)

    res.status(200).json({
        msg: `Hello, username`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    })
}

module.exports = {
    login,
    dashboard,
}
