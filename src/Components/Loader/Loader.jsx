import React, {Fragment,useEffect,useState}  from 'react'
import {Line} from 'rc-progress'; 
import './Loader.css'; 

const PageLoader = (props) => {
 
  const [percentage,setPercentage]=useState(10); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (percentage< 100) {
        setPercentage((prevPercentage) => prevPercentage + 1);
        props.getLoaderPercentage(percentage)
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId); // Clean up the interval when the component unmounts
    };
  }, [percentage]);


  return (
    <Fragment>
    <section className=" ">
      <div className="container py-5 text-center">
        <span className="loaderPage"><span className="loader-inner_page"></span></span>
        <br />
        <br />
        
   
       <div  className="px-5" >
        Loading : {percentage}%
        <Line  percent={percentage} strokeWidth={2} strokeColor="#9c30a4" trailcolor=""/>
        </div>
        <div className="mt-3">
        <h3 style={{color:"#0c0f38" }}>Please wait,the process may take few seconds ...</h3>
        </div>
      </div>
    </section>
   
    </Fragment>
  )
}

export default PageLoader

