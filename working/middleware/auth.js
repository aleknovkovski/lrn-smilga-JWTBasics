const customAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

async function authenticationMiddleware (req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new customAPIError('please provide an access token', 401)
    }

    const token = authHeader.split(' ')[1]

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decodedToken
        req.user = { id, username }
    } catch (err) {
        throw new customAPIError('Not authorized to access this route', 401)
    }
    next()
}

module.exports = authenticationMiddleware