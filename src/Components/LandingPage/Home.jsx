import About from "../About"
import Header from "../Header"
import Navbarr from "../Navbar/Navbarr"
import './Landing.css'

 

function Home() {
  return (
    <div class="site-blocks-cover overlay"  data-aos="fade" id="home-section">
     <section className='slider'>
    <img src='/images/slide_3.jpg' alt='' />
    <h1>Banking Solutions</h1>
    <h2>Savings Accounts <br/>
    </h2>
  </section>
    <a href="#next" className="mouse smoothscroll">
        <span className="mouse-icon">
          <span className="mouse-wheel"></span>
        </span>
      </a> 
      
      <div className="container" style={{ marginBottom: '0px' }}>
     
        <div className="row align-items-center justify-content-center">
      
        </div>
      </div>
      <About/>
 
      
    
    </div> 
  )
}

export default Home
