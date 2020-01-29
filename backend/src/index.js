// const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const { checkToken } = require('./middlewares')
const { authenticate, addUser, getAbsoluteHours, getMediumHours } = require('./handlers')

// Starting point of the server
const main = () => {
  const app = express() // Export app for other routes to use
  const port = process.env.PORT || 10000

  app.use(bodyParser.json())
  // app.use(cors())
  app.use(bodyParser.urlencoded({ // Middleware
    extended: true,
  }))

  // serve the frontend and static assets
  app.use('/', express.static('public/dist/'))
  app.use('/dist', express.static('public/dist/'))

  app.locals.basedir = '/'

  // Routes & Handlers
  app.post('/v1/addUser', addUser)
  app.post('/v1/authenticate', authenticate)

  app.get('/v1/getMediumHours/:startDate/:endDate/', getMediumHours)
  app.get('/v1/getAbsoluteHours/:startDate/:endDate/', getAbsoluteHours)

  // app.post('/v1/addStartDate', checkToken, addStartDate)
  // app.post('/v1/addEndDate', checkToken, addEndDate)

  app.listen(port, () => console.log(`Server is listening on port: ${port}`))
}

main()

