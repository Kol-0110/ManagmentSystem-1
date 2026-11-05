import { Link, useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // The home page already renders its own Bootstrap navigation bar.
  if (location.pathname === '/') {
    return null
  }

  const rawUser = localStorage.getItem('cambridge_user') || sessionStorage.getItem('cambridge_user')
  let user = null
  try {
    user = rawUser ? JSON.parse(rawUser) : null
  } catch (e) {
    user = null
  }

  const role = user?.role?.toLowerCase()
  const isSuperAdmin = role === 'superadmin'
  const isAdmin = role === 'admin' || role === 'administrator'
  const canViewStudents = isSuperAdmin || isAdmin

  const handleLogout = () => {
    localStorage.removeItem('cambridge_user')
    sessionStorage.removeItem('cambridge_user')
    localStorage.removeItem('cambridge_token')
    sessionStorage.removeItem('cambridge_token')
    navigate('/Login')
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="site-brand" to="/">
          <span>Welcome To <strong>CAMBRIDGE</strong></span>
          <img className="Act-logo" src="/Logo.jpg" alt="Cambridge Logo" />
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          {isSuperAdmin && (
            <Link className="site-nav-link site-nav-roles" to="/admin/roles" title="Super Admin Role Management">
              Manage Roles
            </Link>
          )}
          {canViewStudents && (
            <Link className="site-nav-link" to="/Students">Students</Link>
          )}
          <Link className="site-nav-link" to="/Enroll">Register</Link>
          {!user && (
            <Link className="site-nav-link" to="/signup">Sign Up</Link>
          )}
        </nav>

        {user ? (
          <div className="site-account">
            <span className={`site-role-badge${isSuperAdmin ? ' site-role-badge-superadmin' : ''}`}>
              {isSuperAdmin ? '👑 Super Admin' : (isAdmin ? '🛡️ Admin' : '👤 User')}
            </span>
            <button
              className="site-nav-link site-logout"
              onClick={handleLogout}
              title="Log out"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link className="site-nav-link" to="/Login">Login</Link>
        )}
      </div>
    </header>
  )
}

export default Navbar