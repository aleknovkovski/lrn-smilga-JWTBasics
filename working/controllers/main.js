async function login (req, res) {
    res.send("Fake login/register/signup")
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
