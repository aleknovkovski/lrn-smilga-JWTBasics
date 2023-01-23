const {UnauthenticatedError} = require('../errors/')
const jwt = require('jsonwebtoken')

async function authenticationMiddleware (req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('please provide an access token')
    }

    const token = authHeader.split(' ')[1]

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decodedToken
        req.user = { id, username }
    } catch (err) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }
    next()
}

module.exports = authenticationMiddleware