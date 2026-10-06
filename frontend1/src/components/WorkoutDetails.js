import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { API_URL } from '../config'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()

  const handleClick = async () => {
    try {
      const response = await fetch(`${API_URL}/api/workouts/${workout._id}`, {
        method: 'DELETE'
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'DELETE_WORKOUT', payload: json})
      } else {
        console.error('Delete failed:', json)
      }
    } catch (err) {
      console.error('Delete request error:', err)
    }
  }

  return (
    <tr>
      <td>{workout.firstName}</td>
      <td>{workout.lastname}</td>
      <td>{workout.address}</td>
      <td>{workout.phone}</td>
      <td>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</td>
      <td>
        <span 
          className="material-symbols-outlined table-delete-btn" 
          onClick={handleClick}
          title="Delete"
        >
          delete
        </span>
      </td>
    </tr>
  )
}

export default WorkoutDetails