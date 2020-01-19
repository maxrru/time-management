const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config')

const authenticate = (req, res) => {
    const username = req.body.username
    const password = req.body.password

    getUserRecord({ username }).then(databaseResponse => {
      if (databaseResponse.length === 0) {
        res.status(404).send({
          success: false,
          message: 'Incorrect username or password',
        })
        return
      }

      const hashedPassword = databaseResponse[0].password
      const salt = databaseResponse[0].salt
      const saltedPassword = `${salt}${password}`
      const userId = databaseResponse[0].id

      bcrypt.compare(saltedPassword, hashedPassword).then(response => {
        if (response) {
          const token = jwt.sign({ username, userId },
            config.secret,
            { expiresIn: '24h' }
          )
          // return the JWT token for the future API calls
          res.status(200).send({
            success: true,
            message: 'Authentication successful!',
            auth_token: token,
          })
        } else {
          res.status(404).send({
            success: false,
            message: 'Incorrect username or password',
          })
        }
      })
    })
}

module.exports = { authenticate }
