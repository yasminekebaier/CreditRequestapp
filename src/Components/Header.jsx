import React from 'react'

const Header = () => {
  return (
    <header className="site-navbar js-sticky-header site-navbar-target" role="banner">

    <div className="container">
      <div className="row align-items-center">
        
        <div className="col-6 col-xl-2">
          <h1 className="mb-0 site-logo"><a href="index.html" className="h2 mb-0">Banker<span className="text-primary">.</span> </a></h1>
        </div>

        <div className="col-12 col-md-10 d-none d-xl-block">
          <nav className="site-navigation position-relative text-right" role="navigation">

            <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
              <li><a href="#home-section" className="nav-link">Home</a></li>
              <li className="has-children">
                <a href="#about-section" className="nav-link">About Us</a>

              </li>
              
              
              <li><a href="#blog-section" className="nav-link">Blog</a></li>
              <li><a href="#contact-section" className="nav-link">Contact</a></li>
              <li className="social"><a href="#contact-section" className="nav-link"><span className="icon-facebook"></span></a></li>
              <li className="social"><a href="#contact-section" className="nav-link"><span className="icon-twitter"></span></a></li>
              <li className="social"><a href="#contact-section" className="nav-link"><span className="icon-linkedin"></span></a></li>
            </ul>
          </nav>
        </div>


        <div className="col-6 d-inline-block d-xl-none ml-md-0 py-3" style="position: relative; top: 3px;"><a href="#" className="site-menu-toggle js-menu-toggle float-right"><span className="icon-menu h3"></span></a></div>

      </div>
    </div>
    
  </header>
  )
}

export default Header