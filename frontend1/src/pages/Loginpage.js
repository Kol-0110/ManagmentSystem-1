import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

export default function Loginpage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [forgotMsg, setForgotMsg] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic validation
        if (!email.trim() || !password.trim()) {
            setError('Please enter both username/phone and password.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ identifier: email.trim(), password })
            });

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error || 'Login failed. Please check your credentials.');
                return;
            }

            // Store session & token in localStorage and sessionStorage
            if (json.token) {
                localStorage.setItem('cambridge_token', json.token);
                sessionStorage.setItem('cambridge_token', json.token);
            }
            localStorage.setItem('cambridge_user', JSON.stringify(json.user));
            sessionStorage.setItem('cambridge_user', JSON.stringify(json.user));

            setIsLoading(false);
            setSuccess(`Welcome back, ${json.user.fullName || json.user.username}! Redirecting...`);

            // Redirect to Home page after brief feedback
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (err) {
            setIsLoading(false);
            setError('Could not connect to the backend server. Please make sure the server is running.');
        }
    };

    return (
        <div className="login-page-wrapper">
            <div className="login-card">
                {/* Brand Header */}
                <div className="login-header">
                    <img src="/Logo.jpg" alt="Cambridge Logo" className="login-logo" />
                    <h2 className="login-title">
                        CAMBRIDGE <span>PORTAL</span>
                    </h2>
                    <p className="login-subtitle">Sign in to your administrative account</p>
                </div>

                {/* Error Feedback */}
                {error && (
                    <div className="login-alert login-alert-error" role="alert">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                {/* Success Feedback */}
                {success && (
                    <div className="login-alert login-alert-success" role="alert">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span>{success}</span>
                    </div>
                )}

                {/* Forgot password info dialog */}
                {forgotMsg && (
                    <div className="login-alert login-alert-info">
                        <span>Contact Cambridge IT helpdesk at <b>support@cambridge.edu</b> to reset your password.</span>
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="login-form" noValidate>
                    {/* Username or Phone Number field */}
                    <div className="login-field">
                        <label htmlFor="login-email">Username or Phone Number</label>
                        <div className="login-input-wrapper">
                            <span className="login-input-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </span>
                            <input
                                id="login-email"
                                type="text"
                                placeholder="e.g. Your First Name or Phone Number"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={error && !email.trim() ? 'input-error' : ''}
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    {/* Password field */}
                    <div className="login-field">
                        <label htmlFor="login-password">Password</label>
                        <div className="login-input-wrapper">
                            <span className="login-input-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </span>
                            <input
                                id="login-password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={error && !password.trim() ? 'input-error' : ''}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                                title={showPassword ? 'Hide password' : 'Show password'}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Options: Remember Me & Forgot Password */}
                    <div className="login-options-row">
                        <label className="login-checkbox-label">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span>Remember me</span>
                        </label>
                        <button
                            type="button"
                            className="forgot-password-link"
                            onClick={() => setForgotMsg(!forgotMsg)}
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="login-submit-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <svg className="login-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
                                </svg>
                                <span>Signing In...</span>
                            </>
                        ) : (
                            <span>Sign In</span>
                        )}
                    </button>
                </form>

                {/* Demo Credentials Quick Fill box */}


                {/* Footer Navigation */}
                <div className="login-footer-links">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/signup" style={{ fontWeight: 'bold', color: 'darkred' }}>Sign Up Here</Link>
                    </p>
                    <div className="enrollment-switch-box" style={{ marginTop: '8px', fontSize: '0.9rem' }}>
                        <span>Looking to register a student instead?</span>{' '}
                        <Link to="/Enroll" style={{ color: '#444', textDecoration: 'underline' }}>
                            Student Admission Registration →
                        </Link>
                    </div>
                    <Link to="/" className="login-back-home" style={{ marginTop: '12px', display: 'inline-block' }}>
                        ← Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
