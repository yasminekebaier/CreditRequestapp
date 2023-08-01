import About from "../About"
import Header from "../Header"
import Navbarr from "../Navbar/Navbarr"
import './Landing.css'

 

function Home() {
  return (
    <div class="site-blocks-cover overlay"  data-aos="fade" id="home-section">
     <section className='slider'>
    <img src='/images/slide_3.jpg' alt='' />
    <h1>Banking Solutions ,Savings Accounts!</h1>
  </section>
    <a href="#next" className="mouse smoothscroll">
        <span className="mouse-icon">
          <span className="mouse-wheel"></span>
        </span>
      </a> 
      
      <section class="site-section border-bottom bg-light" id="services-section">
      <div class="container" style={{ marginBottom: '0px' }}>
        <div class="row mb-5">
          <div class="col-12 text-center" data-aos="fade">
            <h2 class="section-title mb-3" ma>Our Services</h2>
          </div>
        </div>
        <div class="row align-items-stretch">
          <div class="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up">
            <div class="unit-4">
              <div class="unit-4-icon">
                <img src="images/flaticon-svg/svg/001-wallet.svg" alt="Free Website Template by Free-Template.co" class="img-fluid w-25 mb-4"/>
              </div>
              <div>
                <h3>Business Consulting</h3>
                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                <p><a href="#">Learn More</a></p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="100">
            <div class="unit-4">
              <div class="unit-4-icon">
                <img src="images/flaticon-svg/svg/006-credit-card.svg" alt="Free Website Template by Free-Template.co" class="img-fluid w-25 mb-4"/>
              </div>
              <div>
                <h3>Credit Card</h3>
                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                <p><a href="#">Learn More</a></p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="200">
            <div class="unit-4">
              <div class="unit-4-icon">
                <img src="images/flaticon-svg/svg/002-rich.svg" alt="Free Website Template by Free-Template.co" class="img-fluid w-25 mb-4"/>
              </div>
              <div>
                <h3>Income Monitoring</h3>
                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                <p><a href="#">Learn More</a></p>
              </div>
            </div>
          </div>


          <div class="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="">
            <div class="unit-4">
              <div class="unit-4-icon">
                <img src="images/flaticon-svg/svg/003-notes.svg" alt="Free Website Template by Free-Template.co" class="img-fluid w-25 mb-4"/>
              </div>
              <div>
                <h3>Insurance Consulting</h3>
                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                <p><a href="#">Learn More</a></p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="100">
            <div class="unit-4">
              <div class="unit-4-icon">
                <img src="images/flaticon-svg/svg/004-cart.svg" alt="Free Website Template by Free-Template.co" class="img-fluid w-25 mb-4"/>
              </div>
              <div>
                <h3>Financial Investment</h3>
                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                <p><a href="#">Learn More</a></p>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 mb-4 mb-lg-4" data-aos="fade-up" data-aos-delay="200">
            <div class="unit-4">
              <div class="unit-4-icon">
                <img src="images/flaticon-svg/svg/005-megaphone.svg" alt="Free Website Template by Free-Template.co" class="img-fluid w-25 mb-4"/>
              </div>
              <div>
                <h3>Financial Management</h3>
                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                <p><a href="#">Learn More</a></p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
      <About/>
 
      
    
    </div> 
  )
}

export default Home
