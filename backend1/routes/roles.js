const express = require('express');
const {
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
  getRoleStats
} = require('../controllers/roleController');
const { protect, requireSuperAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// All role management endpoints require authentication and Super Admin privileges
router.use(protect);
router.use(requireSuperAdmin);

// Role management routes
router.get('/users', getAllUsers);
router.get('/stats', getRoleStats);
router.patch('/:id/role', updateUserRole);
router.patch('/:id/status', toggleUserStatus);

module.exports = router;
