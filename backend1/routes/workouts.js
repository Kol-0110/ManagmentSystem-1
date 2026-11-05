const express = require('express')
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  loginWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController')
const { protect, requireAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

// POST login
router.post('/login', loginWorkout)

// POST a new workout (student admission / enrollment submission - public)
router.post('/', createWorkout)

// GET all workouts (only Super Admin and Admin)
router.get('/', protect, requireAdmin, getWorkouts)

// GET a single workout (only Super Admin and Admin)
router.get('/:id', protect, requireAdmin, getWorkout)

// DELETE a workout (only Super Admin and Admin)
router.delete('/:id', protect, requireAdmin, deleteWorkout)

// UPDATE a workout (only Super Admin and Admin)
router.patch('/:id', protect, requireAdmin, updateWorkout)

module.exports = router