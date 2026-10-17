require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts')
const authRoutes = require('./routes/auth')
const roleRoutes = require('./routes/roles')
const seedSuperAdmin = require('./utils/seedAdmin')

// express app
const app = express()

// middleware
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/auth', authRoutes)
app.use('/api/roles', roleRoutes)
app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('connected to database')
    
    // Automatically seed/verify default Super Admin
    await seedSuperAdmin()

    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 