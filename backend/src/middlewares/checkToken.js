const jwt = require('jsonwebtoken')
const config = require('../config.js')

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length)
  }

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Authorization failed',
        })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(401).send({
      success: false,
      message: 'Authorization failed',
    })
  }
}

module.exports = { checkToken }


