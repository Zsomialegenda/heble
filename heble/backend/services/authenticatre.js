const jwst = require('jsonwebtoken');

const {
    Code404,
    Code403
} = require('../controllers/statusCodeController');

const authenticator = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
        return Code404(null, null, res, null, reason);

    jwt.verify(token, 'secret', async (err, response) => {
        if (err)
            return Code403

        res.locals = response;
        nect();
    })
}

module.exports = {
    authenticator
}