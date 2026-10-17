import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../config';

export default function RoleManagement() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({ total: 0, superAdmins: 0, admins: 0, users: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('ALL');
    const [actionLoadingId, setActionLoadingId] = useState(null);
    const [alert, setAlert] = useState({ type: '', message: '' });

    // Retrieve active user & token
    const token = localStorage.getItem('cambridge_token') || sessionStorage.getItem('cambridge_token');
    const rawUser = localStorage.getItem('cambridge_user') || sessionStorage.getItem('cambridge_user');
    let currentUser = null;
    try {
        currentUser = rawUser ? JSON.parse(rawUser) : null;
    } catch (e) {
        currentUser = null;
    }

    // Guard: Only Super Admin can access
    useEffect(() => {
        if (!currentUser || currentUser.role !== 'superadmin') {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    // Fetch users and stats
    const fetchData = async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const [usersRes, statsRes] = await Promise.all([
                fetch(`${API_URL}/api/roles/users`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch(`${API_URL}/api/roles/stats`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]);

            if (usersRes.ok && statsRes.ok) {
                const usersData = await usersRes.json();
                const statsData = await statsRes.json();
                setUsers(usersData);
                setStats(statsData);
            } else {
                setAlert({ type: 'error', message: 'Failed to load user records from server.' });
            }
        } catch (err) {
            setAlert({ type: 'error', message: 'Network error connecting to role management service.' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle role change (promote/demote)
    const handleRoleChange = async (userId, targetRole, username) => {
        setActionLoadingId(userId);
        setAlert({ type: '', message: '' });

        try {
            const response = await fetch(`${API_URL}/api/roles/${userId}/role`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ role: targetRole })
            });

            const data = await response.json();

            if (response.ok) {
                setAlert({
                    type: 'success',
                    message: `Role updated: ${username} is now an ${targetRole.toUpperCase()}.`
                });
                // Refresh list and statistics
                fetchData();
            } else {
                setAlert({ type: 'error', message: data.error || 'Failed to update user role.' });
            }
        } catch (err) {
            setAlert({ type: 'error', message: 'Network error while updating role.' });
        } finally {
            setActionLoadingId(null);
        }
    };

    // Handle status toggle (active / suspended)
    const handleStatusToggle = async (userId, currentStatus, username) => {
        setActionLoadingId(userId);
        setAlert({ type: '', message: '' });

        try {
            const response = await fetch(`${API_URL}/api/roles/${userId}/status`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                setAlert({
                    type: 'success',
                    message: `Status updated: ${username} is now ${data.user.isActive ? 'Active' : 'Suspended'}.`
                });
                fetchData();
            } else {
                setAlert({ type: 'error', message: data.error || 'Failed to update account status.' });
            }
        } catch (err) {
            setAlert({ type: 'error', message: 'Network error updating account status.' });
        } finally {
            setActionLoadingId(null);
        }
    };

    // Filter users by search query and role dropdown
    const filteredUsers = users.filter((u) => {
        const matchesSearch =
            (u.username && u.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (u.fullName && u.fullName.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesRole =
            roleFilter === 'ALL' || u.role.toLowerCase() === roleFilter.toLowerCase();

        return matchesSearch && matchesRole;
    });

    return (
        <div className="role-management-page">
            <div className="role-container">
                {/* Header */}
                <div className="role-header-card">
                    <div className="role-header-info">
                        <span className="role-crown-icon">👑</span>
                        <div>
                            <h1>Super Admin Control Center</h1>
                            <p>Manage system credentials, assign administrator privileges, and audit user roles</p>
                        </div>
                    </div>
                    <div className="role-header-actions">
                        <Link to="/" className="btn-secondary-link">← Return to Portal</Link>
                        <button onClick={fetchData} className="btn-refresh" title="Reload Accounts">
                            🔄 Refresh
                        </button>
                    </div>
                </div>

                {/* Feedback Alerts */}
                {alert.message && (
                    <div className={`login-alert login-alert-${alert.type}`} style={{ margin: '16px 0' }}>
                        <span>{alert.message}</span>
                    </div>
                )}

                {/* Metrics Bar */}
                <div className="role-stats-grid">
                    <div className="role-stat-card">
                        <span className="stat-label">Total Accounts</span>
                        <span className="stat-value">{stats.total}</span>
                    </div>
                    <div className="role-stat-card card-superadmin">
                        <span className="stat-label">Super Admins</span>
                        <span className="stat-value">{stats.superAdmins}</span>
                    </div>
                    <div className="role-stat-card card-admin">
                        <span className="stat-label">Administrators</span>
                        <span className="stat-value">{stats.admins}</span>
                    </div>
                    <div className="role-stat-card card-user">
                        <span className="stat-label">Standard Users</span>
                        <span className="stat-value">{stats.users}</span>
                    </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="role-filters-row">
                    <div className="search-input-box">
                        <span>🔍</span>
                        <input
                            type="text"
                            placeholder="Search by username, name, or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="role-select-box">
                        <label>Filter Role:</label>
                        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                            <option value="ALL">All Roles</option>
                            <option value="superadmin">Super Admin</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                </div>

                {/* Users Table */}
                <div className="role-table-card">
                    {isLoading ? (
                        <div className="loading-state">
                            <div className="login-spinner" style={{ width: 32, height: 32 }}></div>
                            <p>Loading user accounts and permissions...</p>
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="empty-state">
                            <p>No user accounts match your search criteria.</p>
                        </div>
                    ) : (
                        <table className="role-users-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Current Role</th>
                                    <th>Status</th>
                                    <th>Registered</th>
                                    <th>Super Admin Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((u) => {
                                    const isSuperAdmin = u.role === 'superadmin';
                                    const isAdmin = u.role === 'admin';
                                    const isUser = u.role === 'user';
                                    const isBusy = actionLoadingId === u._id;

                                    return (
                                        <tr key={u._id} className={!u.isActive ? 'user-suspended' : ''}>
                                            <td>
                                                <div className="user-profile-cell">
                                                    <div className={`user-avatar avatar-${u.role}`}>
                                                        {u.fullName ? u.fullName.charAt(0).toUpperCase() : u.username.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="user-fullname">{u.fullName}</div>
                                                        <div className="user-username">@{u.username}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{u.email}</td>
                                            <td>
                                                <span className={`role-badge badge-${u.role}`}>
                                                    {isSuperAdmin && '👑 Super Admin'}
                                                    {isAdmin && '🛡️ Administrator'}
                                                    {isUser && '👤 Normal User'}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`status-pill ${u.isActive ? 'status-active' : 'status-suspended'}`}>
                                                    {u.isActive ? 'Active' : 'Suspended'}
                                                </span>
                                            </td>
                                            <td style={{ fontSize: '0.85rem', color: '#666' }}>
                                                {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td>
                                                {isSuperAdmin ? (
                                                    <span className="protected-tag">Root Account (Protected)</span>
                                                ) : (
                                                    <div className="action-buttons-group">
                                                        {isUser && (
                                                            <button
                                                                className="btn-action btn-promote"
                                                                disabled={isBusy}
                                                                onClick={() => handleRoleChange(u._id, 'admin', u.username)}
                                                                title="Promote to Administrator"
                                                            >
                                                                {isBusy ? '...' : 'Promote to Admin 🛡️'}
                                                            </button>
                                                        )}
                                                        {isAdmin && (
                                                            <button
                                                                className="btn-action btn-demote"
                                                                disabled={isBusy}
                                                                onClick={() => handleRoleChange(u._id, 'user', u.username)}
                                                                title="Demote to Regular User"
                                                            >
                                                                {isBusy ? '...' : 'Demote to User 👤'}
                                                            </button>
                                                        )}
                                                        <button
                                                            className={`btn-action btn-toggle-status ${u.isActive ? 'btn-suspend' : 'btn-activate'}`}
                                                            disabled={isBusy}
                                                            onClick={() => handleStatusToggle(u._id, u.isActive, u.username)}
                                                            title={u.isActive ? 'Suspend User' : 'Activate User'}
                                                        >
                                                            {u.isActive ? 'Suspend' : 'Activate'}
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
