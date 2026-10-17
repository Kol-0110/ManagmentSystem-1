import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { API_URL } from '../config'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastname, setLastname] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSuccess(false)
    setError(null)

    const workout = { firstName, lastname, address, phone, pass }

    try {
      const response = await fetch(`${API_URL}/api/workouts`, {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()

      if (!response.ok) {
        setError(json.error)
        setEmptyFields(json.emptyFields || [])
      }
      if (response.ok) {
        setEmptyFields([])
        setError(null)
        setFirstName('')
        setLastname('')
        setAddress('')
        setPhone('')
        setPass('')
        setIsSuccess(true)
        if (dispatch) {
          try {
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
          } catch (dispatchErr) {
            console.error('Dispatch error:', dispatchErr)
          }
        }

        // Automatically redirect to homepage after showing the confirmation card
        setTimeout(() => {
          navigate('/Students')
        }, 3500)
      }
    } catch (err) {
      console.error('Submission error:', err)
      setError('Failed to send application. Please try again.')
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h2>Student Admission Registration  <img className='Act-logo' src='/Logo.jpg' alt="Logo"></img></h2>
      <p style={{ color: '#64748b', fontSize: '13px', margin: '-4px 0 16px', lineHeight: 1.4 }}>
        Official student enrollment record. If you need a staff or portal login account, please visit <span style={{ fontWeight: '600', color: 'darkred' }}>Sign Up</span>.
      </p>

      <label>First Name:</label>
      <input
        type="text"
        placeholder="Student first name"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        className={emptyFields.includes('firstName') ? 'error' : ''}
      />

      <label>Last Name:</label>
      <input
        type="text"
        placeholder="Student last name"
        onChange={(e) => setLastname(e.target.value)}
        value={lastname}
        className={emptyFields.includes('lastname') ? 'error' : ''}
      />

      <label>Address:</label>
      <input
        type="text"
        placeholder="Residential address"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        className={emptyFields.includes('address') ? 'error' : ''}
      />

      <label>Phone Number:</label>
      <input
        type="number"
        placeholder="e.g. 0712345678"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        className={emptyFields.includes('phone') ? 'error' : ''}
      />

      <label>Student Portal Access Password (Optional):</label>
      <input
        type="password"
        placeholder="Optional student portal password"
        onChange={(e) => setPass(e.target.value)}
        value={pass}
        className={emptyFields.includes('pass') ? 'error' : ''}
      />

      <button className="submit-btn" type="submit">
        Send Information <i className="fa-solid fa-paper-plane" style={{ marginLeft: '6px' }}></i>
      </button>

      {error && <div className="error">{error}</div>}

      {isSuccess && (
        <div className="enroll-success-card success" role="alert">
          <i className="fa-solid fa-circle-check success-icon"></i>
          <div className="success-content">
            <h4>Application Successfully Sent!</h4>
            <p>Thank you for submitting. Redirecting to Students Table...</p>
          </div>
        </div>
      )}
    </form>
  )
}

export default WorkoutForm