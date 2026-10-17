import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

export default function SignUppage() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [termsAgreed, setTermsAgreed] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Front-end validations
        if (!fullName.trim() || !username.trim() || !email.trim() || !password) {
            setError('Please fill in all required fields.');
            return;
        }

        if (username.trim().length < 3) {
            setError('Username must be at least 3 characters long.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match. Please verify.');
            return;
        }

        if (!termsAgreed) {
            setError('Please accept the Terms of Service to continue.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName: fullName.trim(),
                    username: username.trim().toLowerCase(),
                    email: email.trim().toLowerCase(),
                    password
                })
            });

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error || 'Account creation failed. Please try again.');
                return;
            }

            // Successfully signed up! Store token & user session
            if (json.token) {
                localStorage.setItem('cambridge_token', json.token);
                sessionStorage.setItem('cambridge_token', json.token);
            }
            if (json.user) {
                localStorage.setItem('cambridge_user', JSON.stringify(json.user));
                sessionStorage.setItem('cambridge_user', JSON.stringify(json.user));
            }

            setIsLoading(false);
            setSuccess('Account created successfully as User! Redirecting to homepage...');

            setTimeout(() => {
                navigate('/');
            }, 1200);
        } catch (err) {
            setIsLoading(false);
            setError('Could not connect to the authentication server. Please ensure the backend is running.');
        }
    };

    return (
        <div className="login-page-wrapper">
            <div className="login-card signup-card">
                {/* Brand Header */}
                <div className="login-header">
                    <img src="/Logo.jpg" alt="Cambridge Logo" className="login-logo" />
                    <h2 className="login-title">
                        CAMBRIDGE <span>SIGN UP</span>
                    </h2>
                    <p className="login-subtitle">
                        Create a portal account for system access
                    </p>
                    <div className="account-type-badge">
                        <span>Standard User Account</span>
                    </div>
                </div>

                {/* Error Banner */}
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

                {/* Success Banner */}
                {success && (
                    <div className="login-alert login-alert-success" role="alert">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        <span>{success}</span>
                    </div>
                )}

                {/* Sign Up Form */}
                <form onSubmit={handleSubmit} className="login-form" noValidate>
                    {/* Full Name */}
                    <div className="login-field">
                        <label htmlFor="signup-name">Full Name</label>
                        <div className="login-input-wrapper">
                            <span className="login-input-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </span>
                            <input
                                id="signup-name"
                                type="text"
                                placeholder="e.g. Alexander Hamilton"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                autoComplete="name"
                            />
                        </div>
                    </div>

                    {/* Username */}
                    <div className="login-field">
                        <label htmlFor="signup-username">Username</label>
                        <div className="login-input-wrapper">
                            <span className="login-input-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="4" />
                                    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
                                </svg>
                            </span>
                            <input
                                id="signup-username"
                                type="text"
                                placeholder="e.g. alexander_h"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="login-field">
                        <label htmlFor="signup-email">Email Address</label>
                        <div className="login-input-wrapper">
                            <span className="login-input-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </span>
                            <input
                                id="signup-email"
                                type="email"
                                placeholder="e.g. alex@cambridge.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="login-field">
                        <label htmlFor="signup-password">Password (min. 6 characters)</label>
                        <div className="login-input-wrapper">
                            <span className="login-input-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </span>
                            <input
                                id="signup-password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                                title={showPassword ? 'Hide password' : 'Show password'}
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

                    {/* Confirm Password */}
                    <div className="login-field">
                        <label htmlFor="signup-confirm-password">Confirm Password</label>
                        <div className="login-input-wrapper">
                            <span className="login-input-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </span>
                            <input
                                id="signup-confirm-password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    {/* Terms Agreement */}
                    <div className="login-options-row">
                        <label className="login-checkbox-label">
                            <input
                                type="checkbox"
                                checked={termsAgreed}
                                onChange={(e) => setTermsAgreed(e.target.checked)}
                            />
                            <span>I agree to the Cambridge Portal Terms & Policies</span>
                        </label>
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
                                <span>Creating Account...</span>
                            </>
                        ) : (
                            <span>Create Account</span>
                        )}
                    </button>
                </form>

                {/* Footer Navigation: Distinguish from Student Registration */}
                <div className="login-footer-links">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login">Sign In</Link>
                    </p>
                    <div className="enrollment-switch-box">
                        <span>Need to enroll a student instead?</span>{' '}
                        <Link to="/Enroll" className="enroll-switch-link">
                            Go to Student Admission Registration →
                        </Link>
                    </div>
                    <Link to="/" className="login-back-home">
                        ← Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
