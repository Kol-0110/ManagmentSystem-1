// Base API URL configuration
// In production (Render), set REACT_APP_API_URL in Render's Environment settings:
// e.g., REACT_APP_API_URL = https://your-backend-name.onrender.com
// In local development, if REACT_APP_API_URL is unset, it falls back to empty string
// which leverages Create React App's proxy in package.json.
export const API_URL = (process.env.REACT_APP_API_URL || '').replace(/\/$/, '')

