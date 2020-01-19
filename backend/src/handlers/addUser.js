const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config')

const addUser = (req, res) => {
    const username = req.body.username
    const plainPassword = req.body.password

    getUserRecord({ username }).then(databaseResponse => {
      if (databaseResponse.length > 0) {
        res.status(409).send({
          success: false,
          message: 'user creation failed',
        })
        return
      }

      bcrypt.genSalt(config.saltRounds).then(salt => {
        const saltedPassword = `${salt}${plainPassword}`

        bcrypt.hash(saltedPassword, salt).then(hashedPassword => {
          setUserRecord({ username, hashedPassword, salt })
            .then(() => res.status(201).send({
              success: true,
              message: 'created',
            }))
        })
      })
    })
}
module.exports = { addUser }
