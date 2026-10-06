import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { API_URL } from "../config"

// components
import WorkoutDetails from "../components/WorkoutDetails"

const Student = () => {
  const { workouts, dispatch } = useWorkoutsContext()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`${API_URL}/api/workouts`)
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    fetchWorkouts()
  }, [dispatch])

  // Filter students by first name, last name, or full name
  const filteredWorkouts = workouts
    ? workouts.filter(workout => {
        const firstName = workout.firstName ? workout.firstName.toLowerCase() : ''
        const lastName = (workout.lastname || workout.lastName) ? (workout.lastname || workout.lastName).toLowerCase() : ''
        const fullName = `${firstName} ${lastName}`.trim()
        const query = searchTerm.toLowerCase().trim()

        if (!query) return true

        return (
          firstName.includes(query) ||
          lastName.includes(query) ||
          fullName.includes(query)
        )
      })
    : []

  return (
    <div className="students-page-container">
      <div className="students-header-bar">
        <div className="students-title-area">
          <h2>Registered Students</h2>
          <span className="students-count-badge">
            {workouts
              ? searchTerm
                ? `${filteredWorkouts.length} of ${workouts.length} found`
                : `${workouts.length} student${workouts.length === 1 ? '' : 's'}`
              : 'Loading...'}
          </span>
        </div>

        <div className="students-search-box">
          <i className="fa-solid fa-magnifying-glass search-icon" aria-hidden="true"></i>
          <input
            type="text"
            placeholder="Search students by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search students by name"
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchTerm('')}
              title="Clear search"
              aria-label="Clear search"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>
      </div>

      <div className="students-table-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th>First Name</th> 
              <th>Last Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Registered Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>  
            {filteredWorkouts && filteredWorkouts.length > 0 ? (
              filteredWorkouts.map(workout => (
                <WorkoutDetails workout={workout} key={workout._id} />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-students-message">
                  {searchTerm ? (
                    <div>
                      <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '22px', marginBottom: '8px', color: '#94a3b8', display: 'block' }}></i>
                      No students found matching "<strong>{searchTerm}</strong>"
                    </div>
                  ) : (
                    <div>No students registered yet.</div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Student;