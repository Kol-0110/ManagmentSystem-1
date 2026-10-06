import React from 'react';

export default function Features() {
  const pathwayStages = [
    {
      id: 1,
      title: 'Cambridge Early Years',
      age: 'Age 3+',
      themeColor: '#712f91',
      lightBg: '#f6eff8',
      intro: 'A play based programme, with:',
      bullets: [
        'a holistic curriculum',
        'engaging resources',
        'support to measure progress' 
      ],
      footerNote: '6 curriculum areas including Personal, social and emotional development'
    },
    {
      id: 2,
      title: 'Cambridge Primary',
      age: 'Age 5+',
      themeColor: '#0072bc',
      lightBg: '#eaf3fb',
      intro: '',
      bullets: [
        'Clear, adaptable curriculum',
        'Flexible assessment options',
        'Support and resources',
        'Insight to understand potential'
      ],
      footerNote: '10+ subjects including English, Mathematics and Science'
    },
    {
      id: 3,
      title: 'Cambridge Lower Secondary',
      age: 'Age 11+',
      themeColor: '#00a651',
      lightBg: '#e6f7ef',
      intro: '',
      bullets: [
        'Clear, adaptable curriculum',
        'Flexible assessment options',
        'Support and resources',
        'Insight to predict performance'
      ],
      footerNote: '10+ subjects including English, Mathematics and Science'
    },
    {
      id: 4,
      title: 'Cambridge Upper Secondary',
      age: 'Age 14+',
      themeColor: '#f37021',
      lightBg: '#fef3ec',
      intro: '',
      bullets: [
        'Broad, adaptable curriculum',
        'Fair, valid, reliable assessment',
        'Support and resources',
        'Insight to optimise achievement'
      ],
      footerNote: 'Cambridge IGCSE™: 70+ subjects\nCambridge O Level: 40+ subjects'
    },
    {
      id: 5,
      title: 'Cambridge Advanced',
      age: 'Age 16+',
      themeColor: '#a61a30',
      lightBg: '#fbebed',
      intro: '',
      bullets: [
        'In-depth, adaptable curriculum',
        'Fair, valid, reliable assessment',
        'Support and resources',
        'Insight to predict performance'
      ],
      footerNote: 'Cambridge International AS & A Level: 55+ subjects'
    }
  ];

  const elementsList = [
    {
      title: 'International curriculum',
      text: "We offer a wide range of subjects and give schools flexibility in how to offer them. We support schools in developing a curriculum that suits their context, culture and ethos, and that they can tailor to their students' needs."
    },
    {
      title: 'Teaching and learning',
      text: 'We provide professional development for teachers, to help them improve their performance and practice throughout their careers. We encourage teaching practices that develop the ability of students to reflect on their learning.'
    },
    {
      title: 'Assessment',
      text: 'We design our assessments to be fair, valid, reliable and practicable. We assess what we know to be of value: deep subject knowledge, conceptual understanding, and higher level thinking skills. Our flexible assessment structure maximises time for teaching and learning.'
    },
    {
      title: 'International recognition',
      text: 'Our qualifications are widely recognised by universities and employers. Cambridge students can be confident that their qualifications will be understood and valued throughout their education and career, in their home country and internationally.'
    },
    {
      title: 'Global community',
      text: 'Cambridge schools belong to a worldwide education community. We support professional learning communities which connect teachers around the world so that we can share views, information and resources, and learn from one another.'
    }
  ];

  return (
    <div className="cambridge-page-wrapper">
      {/* Hero Banner Image */}
      <div className="cambridge-hero-banner">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&auto=format&fit=crop&q=80"
          alt="Cambridge Education Programmes"
          className="cambridge-hero-img"
        />
      </div>

      <div className="cambridge-content-container cambridge-features-container">
        {/* Breadcrumb */}
        <nav className="cambridge-breadcrumb" aria-label="breadcrumb">
          <a href="#home">Home</a>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">Programmes and qualifications</span>
        </nav>

        {/* 2-Column Main Layout: Sidebar & Content */}
        <div className="cambridge-layout">
          {/* Left Sidebar */}
          <aside className="cambridge-sidebar">
            <div className="sidebar-top-title">
              <a href="#programmes-and-qualifications" style={{ color: '#00738c' }}>
                Programmes and qualifications
              </a>
            </div>

            <ul className="sidebar-child-list" style={{ borderBottom: 'none', paddingLeft: '8px' }}>
              <li>
                <a href="#early-years">
                  <span className="sidebar-child-chevron">&rsaquo;</span>
                  <span>Cambridge Early Years</span>
                </a>
              </li>
              <li>
                <a href="#primary">
                  <span className="sidebar-child-chevron">&rsaquo;</span>
                  <span>Cambridge Primary</span>
                </a>
              </li>
              <li>
                <a href="#lower-secondary">
                  <span className="sidebar-child-chevron">&rsaquo;</span>
                  <span>Cambridge Lower Secondary</span>
                </a>
              </li>
              <li>
                <a href="#upper-secondary">
                  <span className="sidebar-child-chevron">&rsaquo;</span>
                  <span>Cambridge Upper Secondary</span>
                </a>
              </li>
              <li>
                <a href="#advanced">
                  <span className="sidebar-child-chevron">&rsaquo;</span>
                  <span>Cambridge Advanced</span>
                </a>
              </li>
              <li>
                <a href="#recognition">
                  <span className="sidebar-child-chevron">&rsaquo;</span>
                  <span>Recognition and acceptance</span>
                </a>
              </li>
              <li>
                <a href="#bilingual">
                  <span className="sidebar-child-chevron">&rsaquo;</span>
                  <span>What is bilingual education?</span>
                </a>
              </li>
              <li>
                <a href="#global-perspectives">
                  <span className="sidebar-child-chevron">&rsaquo;</span>
                  <span>Cambridge Global Perspectives</span>
                </a>
              </li>
              <li>
                <a href="#insight-assessments">
                  <span className="sidebar-child-chevron">&rsaquo;</span>
                  <span>Cambridge Insight assessments</span>
                </a>
              </li>
              <li>
                <a href="#digital-exams">
                  <span className="sidebar-child-chevron">&rsaquo;</span>
                  <span>Digital exams at Cambridge</span>
                </a>
              </li>
            </ul>
          </aside>

          {/* Right Main Content */}
          <main className="cambridge-main">
            <h1 className="cambridge-main-title">Cambridge Pathway</h1>

            <p className="cambridge-lead-p" style={{ marginBottom: '16px' }}>
              Our Cambridge Pathway is for students aged 3 to 19. Its wide range of subjects and flexibility gives
              schools the chance to shape the curriculum so that it is exciting and relevant for their own students.
            </p>

            <p className="cambridge-lead-p" style={{ marginBottom: '16px' }}>
              Cambridge Pathway students have the chance to acquire the knowledge and skills they need to achieve at
              school, university and beyond.
            </p>

            <p className="cambridge-lead-p" style={{ marginBottom: '32px' }}>
              The five stages lead seamlessly from primary to secondary and pre-university years. Each stage –{' '}
              <a href="#early-years" className="cambridge-inline-link">Cambridge Early Years</a>,{' '}
              <a href="#primary" className="cambridge-inline-link">Cambridge Primary</a>,{' '}
              <a href="#lower-secondary" className="cambridge-inline-link">Cambridge Lower Secondary</a>,{' '}
              <a href="#upper-secondary" className="cambridge-inline-link">Cambridge Upper Secondary</a> and{' '}
              <a href="#advanced" className="cambridge-inline-link">Cambridge Advanced</a> – builds on the learners'
              development from the previous one, but can also be offered separately.
            </p>

            {/* Pathway Section Graphic */}
            <div className="cambridge-pathway-wrapper">
              {/* Top Banner Line */}
              <div className="cambridge-pathway-header">
                <div className="pathway-line"></div>
                <div className="pathway-badge">
                  <span className="pathway-title">Cambridge Pathway</span>
                  <i className="fa-solid fa-play pathway-chevron-icon"></i>
                  <span className="pathway-subtitle">A clear path for educational success from age 3 to 19</span>
                </div>
                <div className="pathway-line"></div>
              </div>

              {/* 5 Pathway Stage Columns */}
              <div className="cambridge-pathway-columns">
                {pathwayStages.map((stage) => (
                  <div key={stage.id} className="pathway-column">
                    {/* Header */}
                    <div className="pathway-col-header" style={{ backgroundColor: stage.themeColor }}>
                      <h3>{stage.title}</h3>
                    </div>

                    {/* Age Pill */}
                    <div className="pathway-age-pill" style={{ backgroundColor: stage.lightBg, color: stage.themeColor }}>
                      <strong>{stage.age}</strong>
                    </div>

                    {/* Content */}
                    <div className="pathway-col-body">
                      {stage.intro && <p className="pathway-col-intro">{stage.intro}</p>}
                      <ul className="pathway-col-bullets">
                        {stage.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom row */}
                    <div className="pathway-col-footer" style={{ borderTop: `2px solid ${stage.themeColor}` }}>
                      {stage.footerNote.split('\n').map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Professional Development Banner across all columns */}
              <div className="cambridge-pd-banner">
                <span>Cambridge Professional Development for teachers and school leaders</span>
              </div>

              {/* Ready for the World Divider */}
              <div className="cambridge-ready-header">
                <div className="pathway-line"></div>
                <div className="ready-badge">
                  <div className="ready-text">
                    <span>Ready for</span>
                    <strong>the world</strong>
                  </div>
                  <div className="ready-shield">
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                </div>
                <div className="pathway-line"></div>
              </div>
            </div>

            {/* Elements Description Section */}
            <div className="cambridge-elements-section">
              <p className="cambridge-lead-p" style={{ marginBottom: '24px' }}>
                Five elements lie at the heart of a Cambridge education:{' '}
                <a href="#curriculum" className="cambridge-inline-link">international curriculum</a>,{' '}
                <a href="#teaching" className="cambridge-inline-link">teaching and learning</a>,{' '}
                <a href="#assessment" className="cambridge-inline-link">assessment</a>,{' '}
                <a href="#recognition" className="cambridge-inline-link">international recognition</a> and{' '}
                <a href="#community" className="cambridge-inline-link">global community</a>.
              </p>

              <div className="cambridge-elements-list">
                {elementsList.map((elem, idx) => (
                  <div key={idx} className="cambridge-element-item">
                    <h2 className="cambridge-element-title">{elem.title}</h2>
                    <p className="cambridge-element-desc">{elem.text}</p>
                  </div>
                ))}
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
  );
}

