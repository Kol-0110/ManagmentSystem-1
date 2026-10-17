const User = require('../models/role/User');
const Admin = require('../models/role/Admin');
const { ROLES } = require('../models/role/RoleTypes');

const seedSuperAdmin = async () => {
  try {
    const existingSuperAdmin = await User.findOne({ role: ROLES.SUPER_ADMIN });

    const username = process.env.SUPERADMIN_USERNAME || 'superadmin';
    const email = process.env.SUPERADMIN_EMAIL || 'superadmin@cambridge.edu';
    const password = process.env.SUPERADMIN_PASSWORD || 'admin123';
    const fullName = 'Cambridge Super Admin';

    if (!existingSuperAdmin) {
      console.log('⚡ Initializing default Super Admin account...');

      const superAdminUser = await User.create({
        username,
        email,
        password,
        fullName,
        role: ROLES.SUPER_ADMIN,
        isActive: true
      });

      // Also create Admin profile record for the super admin
      await Admin.create({
        user: superAdminUser._id,
        department: 'Executive Administration',
        permissions: ['all', 'manage_roles', 'manage_admins', 'manage_students'],
        notes: 'Default root Super Administrator initialized automatically.'
      });

      console.log(`✅ Default Super Admin created successfully.`);
      console.log(`   Username: ${username}`);
      console.log(`   Email:    ${email}`);
      console.log(`   Password: ${password}`);
    } else {
      console.log(`✅ Super Admin verified: ${existingSuperAdmin.username} (${existingSuperAdmin.email})`);
    }
  } catch (error) {
    console.error('❌ Error during Super Admin seeding:', error.message);
  }
};

module.exports = seedSuperAdmin;
