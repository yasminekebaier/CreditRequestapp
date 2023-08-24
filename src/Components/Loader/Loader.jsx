import React, {Fragment}  from 'react'
import './Loader.css'; 

const PageLoader = () => {
  return (
    <Fragment>
    <section className=" ">
      <div className="container py-5 text-center">
        <span className="loaderPage"><span className="loader-inner_page"></span></span>
        <br />
        <br />
        <p>Please wait,the process may take few seconds ...</p>
      </div>
    </section>
   
    </Fragment>
  )
}

export default PageLoader

