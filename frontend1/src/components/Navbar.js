import { Link, useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  // useLocation triggers a re-render whenever the user navigates after logging in or out
  useLocation()

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
    <header>
      <div className="container">
        <Link to="/">
          <h1>Welcome To <span style={{ color: 'darkred' }}><b>CAMBRIDGE</b></span>
            <img className='Act-logo' src='/Logo.jpg' alt="Cambridge Logo"></img>
          </h1>
        </Link>

        {/* Super Admin Exclusive: Role Management */}
        {isSuperAdmin && (
          <Link to="/admin/roles" title="Super Admin Role Management">
            <h1><span style={{ color: '#b8860b' }}><b>👑 Manage Roles</b></span></h1>
          </Link>
        )}

        {/* Enrolled Students Directory (Visible only to Super Admin and Admin) */}
        {canViewStudents && (
          <Link to="/Students">
            <h1><span style={{ color: 'darkred' }}><b>Students</b></span></h1>
          </Link>
        )}

        {/* Student Admission / Registration */}
        <Link to="/Enroll">
          <h1><span style={{ color: 'darkred' }}><b>Register</b></span></h1>
        </Link>

        {/* Sign Up (User Account Creation - when logged out) */}
        {!user && (
          <Link to="/signup">
            <h1><span style={{ color: 'darkred' }}><b>Sign Up</b></span></h1>
          </Link>
        )}

        {/* Login or Logout with User Badge */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{
              fontSize: '0.85rem',
              background: isSuperAdmin ? '#fff3cd' : '#eef2ff',
              color: isSuperAdmin ? '#856404' : '#1e3a8a',
              border: `1px solid ${isSuperAdmin ? '#ffeeba' : '#c7d2fe'}`,
              borderRadius: '20px',
              padding: '3px 10px',
              fontWeight: '600'
            }}>
              {isSuperAdmin ? '👑 Super Admin' : (isAdmin ? '🛡️ Admin' : '👤 User')}
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
              title="Log out"
            >
              <h1><span style={{ color: 'darkred' }}><b>Logout</b></span></h1>
            </button>
          </div>
        ) : (
          <Link to="/Login">
            <h1><span style={{ color: 'darkred' }}><b>Login</b></span></h1>
          </Link>
        )}
      </div>
    </header>
  )
}

export default Navbar