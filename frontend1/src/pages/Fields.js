import React from 'react';

export default function Fields() {
  const cardsData = [
    {
      id: 1,
      title: 'International curriculum',
      image: 'https://www.cambridgeinternational.org/Images/International%20curriculum_509246730_322x122px.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=80',
      description: 'Our curriculum sets a global standard for education, with programmes that stretch, challenge and inspire our students.',
      link: '#international-curriculum'
    },
    {
      id: 2,
      title: 'Teaching and learning',
      image: 'https://www.cambridgeinternational.org/Images/Pinehurst_NZ_026_322x122px.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&auto=format&fit=crop&q=80',
      description: 'The Cambridge teacher and learner attributes inspire a love of learning in our students and an innovative approach in our teachers.',
      link: '#teaching-and-learning'
    },
    {
      id: 3,
      title: 'Fair and meaningful assessment',
      image: 'https://www.cambridgeinternational.org/Images/assessment_622042654_322x122px.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=80',
      description: 'Good assessment is at the heart of a good education. We design assessments that are fair, valid, reliable and practicable.',
      link: '#assessment'
    },
    {
      id: 4,
      title: 'International recognition',
      image: 'https://www.cambridgeinternational.org/Images/international_recognition_509246726.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=80',
      description: 'Cambridge students can be confident that their qualifications will be valued by universities and employers across the world.',
      link: '#international-recognition'
    },
    {
      id: 5,
      title: 'Global community',
      image: 'https://www.cambridgeinternational.org/Images/Global%20community_486834620_322x122px.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=80',
      description: 'Be part of a global community – nearly two million students in 10,000 schools in 160 countries prepare for the future with our qualifications.',
      link: '#global-community'
    }
  ];

  return (
    <div className="cambridge-page-wrapper">
      <div className="cambridge-content-container">
        {/* Breadcrumb */}
        <nav className="cambridge-breadcrumb" aria-label="breadcrumb">
          <a href="#home">Home</a>
          <span className="breadcrumb-separator">&gt;</span>
          <a href="#why-cambridge">Why Cambridge</a>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">Benefits of a Cambridge education</span>
        </nav>

        {/* 2-Column Main Layout: Sidebar & Content */}
        <div className="cambridge-layout">
          {/* Left Sidebar */}
          <aside className="cambridge-sidebar">
            <div className="sidebar-top-title">
              <span className="sidebar-chevron">&rsaquo;</span>
              <a href="#why-cambridge">Why Cambridge</a>
            </div>

            <div className="sidebar-active-section">
              <div className="sidebar-active-heading">
                <span className="sidebar-chevron">&rsaquo;</span>
                <span>Benefits of a Cambridge education</span>
              </div>

              <ul className="sidebar-child-list">
                <li>
                  <a href="#international-curriculum">
                    <span className="sidebar-child-chevron">&rsaquo;</span>
                    <span>International curriculum</span>
                  </a>
                </li>
                <li>
                  <a href="#teaching-and-learning">
                    <span className="sidebar-child-chevron">&rsaquo;</span>
                    <span>Teaching and learning</span>
                  </a>
                </li>
                <li>
                  <a href="#assessment">
                    <span className="sidebar-child-chevron">&rsaquo;</span>
                    <span>Fair and meaningful assessment</span>
                  </a>
                </li>
                <li>
                  <a href="#international-recognition">
                    <span className="sidebar-child-chevron">&rsaquo;</span>
                    <span>International recognition</span>
                  </a>
                </li>
                <li>
                  <a href="#global-community">
                    <span className="sidebar-child-chevron">&rsaquo;</span>
                    <span>Global community</span>
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          {/* Right Main Content */}
          <main className="cambridge-main">
            <h1 className="cambridge-main-title">Benefits of a Cambridge education</h1>
            <p className="cambridge-lead-p">
              Five elements lie at the heart of a Cambridge education: an international curriculum, our approach to
              teaching and learning, fair and meaningful assessment, international recognition, and our global
              community of learners, teachers and schools.
            </p>

            {/* Cards Grid */}
            <div className="cambridge-cards-grid">
              {cardsData.map((card) => (
                <div key={card.id} className="cambridge-card">
                  <div className="cambridge-card-img-wrap">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="cambridge-card-img"
                      onError={(e) => {
                        if (e.target.src !== card.fallbackImage) {
                          e.target.src = card.fallbackImage;
                        }
                      }}
                    />
                  </div>
                  <h2 className="cambridge-card-title">
                    <a href={card.link}>{card.title}</a>
                  </h2>
                  <p className="cambridge-card-desc">{card.description}</p>
                  <div>
                    <button className="cambridge-readmore-btn">Read more</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Guide Callout Box */}
            <div className="cambridge-guide-card">
              <div className="cambridge-guide-img-wrap">
                <img
                  src="https://www.cambridgeinternational.org/Images/International-Education-brochure-v1.png"
                  alt="Our guide to international education"
                  className="cambridge-guide-img"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&auto=format&fit=crop&q=80';
                  }}
                />
              </div>
              <div className="cambridge-guide-content">
                <h3 className="cambridge-guide-heading">Our guide to international education</h3>
                <p className="cambridge-guide-desc">
                  Learn more about Cambridge's approach to providing a truly international education.
                </p>
                <a href="#guide-pdf" className="cambridge-guide-pdf-link">
                  <i className="fa-solid fa-file-pdf cambridge-guide-pdf-icon"></i>
                  <span>Read our International Education Guide</span>
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Dark Footer spanning full width */}
      <footer className="cambridge-footer-full">
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

          {/* Column 2: Quick links */}
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
  );
}

