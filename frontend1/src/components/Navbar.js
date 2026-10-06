import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Welcome To <span style={{ color: 'darkred' } }><b>CAMBRIDGE</b></span> 
          <img className='Act-logo' src='Logo.jpg' alt="Cambridge Logo"></img>
          
          </h1> 
        

        </Link>
        <Link to="/Students">
          <h1><span style={{ color: 'darkred' } }><b>Students</b></span> 
           </h1> 
      </Link>
      <Link to="/Enroll">
          <h1><span style={{ color: 'darkred' } }><b>Register</b></span> 
           </h1>
           </Link>
      </div>
    </header>
  )
}

export default Navbar