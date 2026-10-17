const User = require('../models/role/User');
const Admin = require('../models/role/Admin');
const { ROLES } = require('../models/role/RoleTypes');

// @desc    Get all users with their roles (Super Admin only)
// @route   GET /api/roles/users
// @access  Super Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update a user's role (Super Admin only)
// @route   PATCH /api/roles/:id/role
// @access  Super Admin
const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!role || ![ROLES.ADMIN, ROLES.USER].includes(role)) {
    return res.status(400).json({
      error: `Invalid role specified. Super Admin can assign '${ROLES.ADMIN}' or '${ROLES.USER}'.`
    });
  }

  try {
    const targetUser = await User.findById(id);

    if (!targetUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Safety guard: Super Admin account cannot have its role altered
    if (targetUser.role === ROLES.SUPER_ADMIN) {
      return res.status(403).json({ error: 'Cannot modify the role of the Super Administrator.' });
    }

    const previousRole = targetUser.role;
    targetUser.role = role;
    await targetUser.save();

    // If promoted to Admin, ensure an Admin record exists
    if (role === ROLES.ADMIN) {
      await Admin.findOneAndUpdate(
        { user: targetUser._id },
        {
          user: targetUser._id,
          assignedBy: req.user._id,
          department: 'Academic Administration',
          notes: `Promoted to Admin by Super Admin (${req.user.username}) on ${new Date().toLocaleDateString()}`
        },
        { upsert: true, new: true }
      );
    } else if (role === ROLES.USER) {
      // If demoted to normal User, remove the admin profile entry
      await Admin.findOneAndDelete({ user: targetUser._id });
    }

    res.status(200).json({
      message: `User '${targetUser.username}' successfully updated from ${previousRole} to ${role}.`,
      user: {
        id: targetUser._id,
        username: targetUser.username,
        email: targetUser.email,
        fullName: targetUser.fullName,
        role: targetUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Toggle user active status (Super Admin only)
// @route   PATCH /api/roles/:id/status
// @access  Super Admin
const toggleUserStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const targetUser = await User.findById(id);

    if (!targetUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (targetUser.role === ROLES.SUPER_ADMIN) {
      return res.status(403).json({ error: 'Cannot deactivate the Super Administrator account.' });
    }

    targetUser.isActive = !targetUser.isActive;
    await targetUser.save();

    res.status(200).json({
      message: `User status changed to ${targetUser.isActive ? 'Active' : 'Suspended'}.`,
      user: {
        id: targetUser._id,
        username: targetUser.username,
        isActive: targetUser.isActive
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get system role summary counts (Super Admin only)
// @route   GET /api/roles/stats
// @access  Super Admin
const getRoleStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const superAdminCount = await User.countDocuments({ role: ROLES.SUPER_ADMIN });
    const adminCount = await User.countDocuments({ role: ROLES.ADMIN });
    const regularUserCount = await User.countDocuments({ role: ROLES.USER });

    res.status(200).json({
      total: totalUsers,
      superAdmins: superAdminCount,
      admins: adminCount,
      users: regularUserCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
  getRoleStats
};
