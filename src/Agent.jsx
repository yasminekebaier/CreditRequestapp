import React from  'react'; 
import axios from "axios";
import { useState,useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import Navbarr from './Components/Navbar/Navbarr';
import LanguageContext from './Components/Store/languageProvider';


function Agent (){
  const [language, setLanguage] = useState("en");  
  const [clients, setClients] = useState([]);
  const { id } = useParams(); 
 
    
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
    
    
    return(
      <>
      <LanguageContext.Provider value={{language:language,setLanguage:setLanguage}}>
        <Navbarr />
      </LanguageContext.Provider>
<div className="home"><h4>customers:</h4>
      {clients.map(client => (
        <table className="table align-middle mb-0 bg-white" key={client.cin_number}>
  <thead className="bg-light">
    <tr>
      <th>Name</th>
      <th>email & Mobil Number</th>
      
      <th>CIN</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
         
           
          <div className="ms-3">
            <p className="fw-bold mb-1">{client.surname}</p>
            <p className="text-muted mb-0">{client.name}</p>
          </div>
        
      </td>
      <td>
        <p className="fw-normal mb-1">{ client.email}</p>
        <p className="text-muted mb-0"> {client.phone_number}</p>
      </td>
      
      <td>{client.cin}</td>
      <td>
      <Link to={`/client/${client._id}`}> <button type="button" className="btn btn-link btn-sm btn-rounded">
          Details
        </button></Link>
      </td>
    </tr>
  </tbody>
</table>
      ))}
    </div>
    </>
    );
}
export default Agent;