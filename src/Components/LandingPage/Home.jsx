import About from "../About"
import Footer from "../Footer"
import Header from "../Header"
import Navbarr from "../Navbar/Navbarr"
import './Landing.css'

 

function Home() {
  return (
    <>

    
<section className="banner_main">
         <div className="container">
            <div className="row d_flex">
               <div className="col-md-5">
                  <div className="text-bg">
                     <h1>Loan simulator<br/> Savings simulator</h1>
                     <span>Bankerise</span>
                     <p>The goal is to provide users with a seamless and comprehensive digital banking experience that meets their financial needs and preferences.</p>
                    
                  </div>
               </div>
               <div className="col-md-7">
                  <div className="text-img">
                     <figure><img src="images/img.png" /></figure>
                  </div>
               </div>
            </div>
         </div>
      </section>
      {/* <!-- Hosting --> */}
    {/*   <div id="" class="hosting">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <div class="titlepage">
                     <h2>What’s New In Bankerise</h2>
                  </div>
               </div>
            </div>
            <div class="row">
               <div class="col-md-12">
                  <div class="web_hosting">
                     <figure><img  src="images/web.jpg" alt="#"/></figure>
              
                     
                  </div>
                  
               </div>
            
            </div>
         </div>
      </div> */}
      <div id="why" class="why">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <div class="titlepage">
                     <h2>Why you should choose </h2>
                     <p>making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still </p>
                  </div>
               </div>
            </div>
            <div class="row">
               <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <div id="box_ho" class="why-box">
                     <i><img src="images/why1.png" alt="#" /></i>
                     <h3>the taxes</h3>
                     <p>making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still </p>
                  </div>
                  <a class="read_more bg" href="#">Read More</a>
               </div>
               <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <div class="why-box">
                     <i><img src="images/why2.png" alt="#" /></i>
                     <h3>savings simulator</h3>
                     <p>making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still </p>
                  </div>
                  <a class="read_more bg" href="#">Read More</a>
               </div>
               <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <div class="why-box">
                     <i><img src="images/why3.png" alt="#" /></i>
                     <h3>credit simulator</h3>
                     <p>making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still </p>
                  </div>
                  <a class="read_more bg" href="#">Read More</a>
               </div>
            </div>
         </div>
      </div>
      {/* <!-- end Hosting --> */}
      
  
  
      <About/>
     <Footer/>  
      </>
  )
}

export default Home
