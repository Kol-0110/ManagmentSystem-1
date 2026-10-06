import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';

export default function Home() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <div>
      <Navbar className='text-color' collapseOnSelect expand="lg" bg=''>
      <Container>
        <Navbar.Brand href="#home">
          <img className='Act-logo' src='Logo.jpg' alt="Cambridge Logo"></img>
      <b></b><br></br>
      <span  style={{ color: 'darkred' } }>CAMBRIDGE INTERNATIONAL SCHOOL</span>

</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='feature' href="/Features"><b>Features</b></Nav.Link>
            <NavDropdown
              title={"Academic Progress"}
              id="academic-nav-dropdown"
              renderMenuOnMount={true}
              show={activeDropdown === 'academic'}
              onMouseEnter={() => setActiveDropdown('academic')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <NavDropdown.Item href="#action/3.1"><b>Undergraguate Programs</b><br></br>
              <span className='Textt'>Bachelor's Degrees adn foundation <br></br> courses</span >
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
               <b>GraduaTE Programs</b> <br></br>
               <span className='Textt'>Master's degrees and advanced studies</span>

              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3"><b>Online Programs</b> <br></br><span className='Textt'>
                Flexiable Postgraduate online programs</span></NavDropdown.Item>
              <NavDropdown.Divider />
             
            </NavDropdown>
            <NavDropdown
              title="Training & Consulting"
              id="training-nav-dropdown"
              renderMenuOnMount={true}
              show={activeDropdown === 'training'}
              onMouseEnter={() => setActiveDropdown('training')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <NavDropdown.Item href="#action/3.1"><b>Professional Trainings</b> <br>
              </br>
              <span className='Textt'> Skill-building courses and certeficates</span>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
             <b>Consulting Service</b> <br/>
             <span className='Textt'> Expert advisoury and BPO solution</span>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3"><b>College Advising(CAP)</b> <br/>
              <span className='Textt' > Navigate the collage applictaion <br/> process with support</span>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
            <b>SEED Program </b> <br/> <span className='Textt'> Youth enterpreneurship and enterprice <br/> development with master card... </span>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="News & Others"
              id="news-nav-dropdown"
              renderMenuOnMount={true}
              show={activeDropdown === 'news'}
              onMouseEnter={() => setActiveDropdown('news')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <NavDropdown.Item href="#action/3.1"><b>News & BLOGS</b> <br/> <span className='Textt'>  Lateset stories, announcments, and <br/>updates</span></NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
               <b>Events</b><br/><span className='Textt'> Upcoming events, Workshops,and <br/>seminars</span>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3"><b>Gallery</b> <span className='Textt'> Photos and vidoes from Act life,<br/> events and community Work</span></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                <b>Portals</b> <br/> <span className='Textt'> Student portal and application dashboard</span>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
               <b>Help Center</b><br/><span className='Textt' > Frequently asked questions and supports</span>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link  className='nav-bor' href="/Fields"> <b>Why CAMBRIDGE</b></Nav.Link>
            
            <Nav.Link className='Appy' eventKey={2} href="/Enroll">
           <b>Apply Now</b>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <div className='Home-main' >
      <div className='First-side col-6 col-s-9'  >
      <span className='First-sidesmall'>ETA ACCREDITED INISTITUTE</span><br/>
      <span >
        <b  className='home-text'>
          Student's Gateway to <br/>
          <span style={{color:'darkred'}}>International</span> <br/>
          Higher Education

        </b>
      </span>
      <span>
        <p className='white-color'  >Accredited programs, globally benchmarked standards, and a direct institutional bridge to the United States, delivered in the heart of Addis Ababa.</p>
      </span>
      <span  >
        <p className='First-sidesmall'>IN PARTENERSHIP WITH -------MAHARISHI INTERNATIONAL UNIVERSITY,USA</p>
      </span>
      <button className='button-first' onClick={() => window.location.href = '/Enroll'} >
        Start Application <i class="fa-solid fa-arrow-right"></i>
      </button>
      <button className='button-pad' onClick={() => window.location.href = '/Fields'} >
        Explore program
      </button>
      <button className='button-third' onClick={() => window.location.href = '/Enroll'} >
        Apply to CAP Program
      </button>
      <br/>
      <button className='button-fourth'> <i class="fa-solid fa-star" style={{color:'darkred'}}></i>Internationally accredited </button>
      <button className='button-fifth'> <i class="fa-solid fa-star" style={{color:'darkred'}}></i>Career ready leraning</button>
      </div>

       <div className='col-6 col-s-9'>
      <div className='home-second'>
       <span className='First-sidesmall'>INISTITUTIONAL IMPACT AT A GLANCE</span>  <br/>
       <span ><b className='white-color'> <span style={{color:'darkred'}}>CAMBRIDGE</span> is built for outcomes</b></span> 
       <div className='grad'>
 <div className='col-6 col-s-9' >
       <img src='Side.png' alt="Institutional Impact" ></img>
       </div>
  </div>
       </div>  
           </div>
  </div>

  <div className='col-6 col-s-9'>
    <div className='Below'>
<span>Academic Programs</span><br/>
<span className='home-textbelow'><b>World-Class Degrees,<span className='First-big-middle'>Ethiopian<br/> Roots</span></b></span><br></br>
<span>Explore CAMBRIDGE’s academic pathways, designed to reflect local priorities while maintaining the quality and rigor expected from a globally connected institution.</span><br/>
<br/>
<span><b>UnderGraguate programs<hr/> </b></span>
    </div>
    <div className='cardst'>
      <Card className='transition' style={{ width: '18rem' }}>
      <Card.Body>
        <div>
          <i   class="fa-solid fa-graduation-cap" style={{color:"darkred"}}></i>
          <button className='card-button'> pillar</button>
        </div>
        <Card.Title><b>Bachelor of Computer Science
</b></Card.Title>
        <Card.Subtitle className="mb-2 text-muted">On campus</Card.Subtitle>
        <Card.Text>
          Hands-on software development, systems thinking, and problem-solving designed for highly competitive graduates.
        </Card.Text>
        <Card.Link  className='card-color' href="#"><b className='card-color'>Project Work</b></Card.Link>
        <Card.Link className='card-color' href="#"> <b className='card-color'>Program details <i class="fa-solid fa-arrow-right"></i> </b></Card.Link>
      </Card.Body>
    </Card>

    <Card className='maincard' style={{ width: '18rem' }}>
     
      <Card.Body>
         <div>
          <i   class="fa-solid fa-graduation-cap " style={{color:"darkred"}}></i>
          <button className='card-button'> pillar</button>
        </div>
        
        <Card.Title><b>Bachelor of Business Administration</b></Card.Title>
        <Card.Subtitle className="mb-2 text-muted">On Campus</Card.Subtitle>
        <Card.Text>
          A practical foundation in business, entrepreneurship, finance, and organizational leadership for career readiness.
        </Card.Text>
        <Card.Link className='card-color' href="#"> <b className='card-color'>Project Work</b> </Card.Link>
        <Card.Link className='card-color' href="#"> <b className='card-color'>Program details <i class="fa-solid fa-arrow-right"></i> </b></Card.Link>
      </Card.Body>
    </Card>
 
    </div>

  </div>


  
    <div className='Home-main' >
      <div className='First-side col-6 col-s-9'  >
      <span className='First-sidesmall'>
Impact</span><br/>
      <span className='home-text' >
        <b className='white-color'>
          Measurable <b className='First-big-middle'>Transformation</b> <br/>
          Across Education and <br/>
        Workforce Development

        </b>
      </span>
      <span>
        <p className='white-color'>From academic delivery to large-scale consulting and training initiatives, ACT brings together education, technology, and implementation capacity in one institution.</p>
      </span>
      <div className='white-color'>
<ul className='white-color'>
      <li className='white-color'>
        National and regional workforce development delivery
      </li>
      <li className='white-color'>
        Digital transformation consulting for institutions
      </li>
      <li className='white-color'>
        Internationally connected academic and training partnerships
      </li>
    </ul>
      </div>
    
      <button className='button-first'>Our Story <i class="fa-solid fa-arrow-right"></i></button>
      <button className='button-pad'>Talk to Us</button>
      <br/>
      <button className='button-fourth'>Internationally accredited </button>
      <button className='button-fifth'>Career ready leraning</button>
      </div>

       <div className=' col-6 col-s-9 col-'>
      <div className='home-second'>
       <span className='First-sidesmall'>INISTITUTIONAL IMPACT AT A GLANCE</span>  <br/>
       <span ><b>CAMBRIDGE is built for outcomes</b></span> 
       <div className='grad'>
        <div className=' col-6 col-s-9' >
        <div  className='home-second-inside'>
          <p   className='white-color'><span className='First-big-middle'>37+</span><br/>Projects completed <br/> 
Consulting, training, and implementation projects delivered with public, private, and development partners. </p> 
        </div>

       </div>
       <div className='col-6 col-s-9'>

        <div className='home-second-inside'>
          <span className='First-big-middle'>+550K+</span><br/>
          <p className='white-color'> Trained<br/>
         Learners, professionals, youth, and women equipped through ACT-led education, digital skills, and workforce development initiatives.</p>
         
        </div>
        

       </div>

       </div>
          <div className='grad'>
        <div className=' col-6 col-s-9' >
        <div  className='home-second-inside'>
          <p   className='white-color'><span className='First-big-middle'>14</span><br/>12 regions and 2 chartered coties <br/> 
          <p></p>
Consulting, training, and implementation projects delivered with public, private, and development partners. </p> 
        </div>

       </div>
       <div className='col-6 col-s-9'>

        <div  className='home-second-inside'>
          <span className='First-big-middle'>20+</span><br/>
          <p className='white-color'> Yeras of combined leadership and delivery experiance<br/>
          
         Learners, professionals, youth, and women equipped through ACT-led education, digital skills, and workforce development initiatives.</p>
         
        </div>
        

       </div>

       </div>
       
      </div>

    </div>
  </div>

   <footer className="cambridge-footer-full-home">
        <div className="cambridge-footer-inner">
          {/* Column 1: About us */}
          <div className="cambridge-footer-col">
            <h4 className="cambridge-footer-heading">About us</h4>
            <ul className="cambridge-footer-list">
              <li><a href="#careers">Careers</a></li>
              <li><a href="#help">Help</a></li>
              <li><a href="#contact">Contact us</a></li>
            </ul>
          </div>

          {/* Column 2:  Quick links */}
          <div className="cambridge-footer-col">
            <h4 className="cambridge-footer-heading">Quick links</h4>
            <ul className="cambridge-footer-list">
              <li><a href="#join">Join Cambridge</a></li>
              <li><a href="#find-school">Find a Cambridge school</a></li>
              <li><a href="#training">Book a training course</a></li>
              <li><a href="#other-sites">Log in to our other sites</a></li>
              <li><a href="#store">Visit online store</a></li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div className="cambridge-footer-col cambridge-social-col">
            <div className="cambridge-social-icons">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" title="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" title="X">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" title="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noreferrer" title="YouTube">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Column 4: Cambridge Crest & Logo */}
          <div className="cambridge-footer-col cambridge-footer-brand-col">
            <div className="cambridge-brand-wrap">
              <img
                src="https://www.cambridgeinternational.org/Images/Cambridge_Press_Assessment_Landscape_Logo_Negative.svg"
                alt="Cambridge University Press & Assessment logo"
                className="cambridge-footer-logo-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = e.target.parentElement.querySelector('.cambridge-logo-text-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="cambridge-logo-text-fallback" style={{ display: 'none' }}>
                <i className="fa-solid fa-graduation-cap cambridge-fallback-crest"></i>
                <div>
                  <div className="cambridge-fallback-title">CAMBRIDGE</div>
                  <div className="cambridge-fallback-sub">UNIVERSITY PRESS &amp; ASSESSMENT</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

 </div>
  )
}
