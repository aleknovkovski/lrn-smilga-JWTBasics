const customAPIError = require('../errors/custom-error')

async function login (req, res) {
    const { username, password } = req.body;
    if(!username || !password) {
        throw new customAPIError('Please provide a username and password', 400)
    }

    res.send(`Fake login/register/signup for user ${username} with password ${password}` );
}

async function dashboard (req, res) {
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
