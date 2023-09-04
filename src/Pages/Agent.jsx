import React from  'react'; 
import axios from "axios";
import { useState,useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import Navbarr from '../Components/Navbar/Navbarr';
import LanguageContext from '../Components/Store/languageProvider';
import { useNavigate } from 'react-router-dom';


function Agent (){
  const [language, setLanguage] = useState("en");  
  const [clients, setClients] = useState([]);
  const { id } = useParams(); 
  const isLoggedIn= localStorage.getItem("isLoggedIn");
  const role =localStorage.getItem('role')
  const navigate =useNavigate(); 
 
    
   function fetchClients () {

      axios({
        method: "get",
        url:`http://localhost:4000/creditRequest/show`,
       
      }).then((res) => {
        setClients(res.data);

        console.log("the response is ", res)
        console.log("Registration successful");
      })  .catch(error => {
        console.error("Error fetching client data:", error);
      });
      }
  
      useEffect(() => {
        fetchClients();
      }, []);
      useEffect(()=>{
        if (isLoggedIn=="false"|| !role)
        navigate('/', { replace: true });
      
      })
    /*   useEffect(() => {
        if (isLoggedIn == "false" || !role || role == "agent")
          navigate('/Login', { replace: true });
    
    
      }, [role, isLoggedIn])
     */
    return(
      <>
      <LanguageContext.Provider value={{language:language,setLanguage:setLanguage}}>
        <Navbarr />
      </LanguageContext.Provider>
<div className="home">
  <h4>customers:</h4>
      
  <table className="table align-middle mb-0 bg-white">
    <thead className="bg-light">
      <tr>
          <th>Request Id </th>
          <th>Phone Number </th>
          <th>CIN Number</th>
          <th>status</th>
          <th>Details</th>
      </tr>
    </thead>
    <tbody>
    {clients.map(client => (
        <>
      <tr>
          <td>
            <div className="d-flex align-items-center">
                
                  <div className="ms-3">
                      <h2 className="fw-bold mb-1">
                      {client.name} {client.surname}
                      </h2>
                      <p className="text-muted mb-0">{ client.email}</p>
                  </div>
              </div>
          </td>
          <td>
          {client.phone_number}
          </td>
          <td>
          {client.phone_number}
          </td>
          <td><td>
  {client.status === 'Accepted' ? (
    <span className="badge badge-success rounded-pill d-inline">Accepted</span>
  ) : client.status === 'Refused' ? (
    <span className="badge badge-danger rounded-pill d-inline">Refused</span>
  ): (
    <span className="badge badge-primary rounded-pill d-inline">{client.status}</span>
  )}
</td></td>
          <td>
          <Link to={`/client/${client._id}`}> <button type="button" className="btn btn-link btn-sm btn-rounded">
          Details
        </button></Link>
          </td>
      </tr>
      </>
 


  ))}
</tbody>
  </table>
</div>
    </>
    );
}
export default Agent;