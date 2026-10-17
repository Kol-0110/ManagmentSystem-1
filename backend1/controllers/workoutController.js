const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 })

  res.status(200).json(workouts)
}

// get a single workout  
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    return res.status(404).json({ error: 'No such workout' })
  }

  res.status(200).json(workout)
}

// create a new workout
const createWorkout = async (req, res) => {
  const { firstName, lastname, address, phone, pass } = req.body

  let emptyFields = []

  if (!firstName) {
    emptyFields.push('firstName')
  }

  if (!lastname) {
    emptyFields.push('lastname')
  }
  if (!address) {
    emptyFields.push('address')
  }
  if (!phone) {
    emptyFields.push('phone')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const workout = await Workout.create({ firstName, lastname, address, phone, pass })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// login user / student
const loginWorkout = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Please enter all login credentials' })
  }

  const query = email.trim()

  // Support login by phone number, or by firstName / lastname (case-insensitive)
  let student = null

  // If input is digits, match phone
  const isNumeric = /^\d+$/.test(query)
  if (isNumeric) {
    student = await Workout.findOne({ phone: Number(query) })
  }

  // If not found by phone, search by first name or last name
  if (!student) {
    student = await Workout.findOne({
      $or: [
        { firstName: { $regex: new RegExp(`^${query}$`, 'i') } },
        { lastname: { $regex: new RegExp(`^${query}$`, 'i') } }
      ]
    })
  }

  // Built-in admin fallback check for convenience
  if (!student) {
    if ((query.toLowerCase() === 'admin' || query.toLowerCase() === 'admin@cambridge.edu') && password === 'admin123') {
      return res.status(200).json({
        message: 'Admin login successful',
        user: {
          role: 'Administrator',
          firstName: 'Admin',
          lastname: 'User',
          email: 'admin@cambridge.edu'
        }
      })
    }
    return res.status(400).json({ error: 'No account found with this username, email, or phone number' })
  }

  // Validate password against database
  if (student.pass !== password) {
    return res.status(400).json({ error: 'Incorrect password' })
  }

  res.status(200).json({
    message: 'Login successful',
    user: {
      id: student._id,
      firstName: student.firstName,
      lastname: student.lastname,
      phone: student.phone,
      role: 'Student'
    }
  })
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such workout' })
  }

  const workout = await Workout.findOneAndDelete({ _id: id })

  if (!workout) {
    return res.status(400).json({ error: 'No such workout' })
  }

  res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such workout' })
  }

  const workout = await Workout.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!workout) {
    return res.status(400).json({ error: 'No such workout' })
  }

  res.status(200).json(workout)
}

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  loginWorkout,
  deleteWorkout,
  updateWorkout
}