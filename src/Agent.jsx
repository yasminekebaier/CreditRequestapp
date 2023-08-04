import axios from "axios";
import { useState } from "react";
import { Link } from 'react-router-dom';

function Agent (){
    
    const [clients,setclients] = useState([{name:'amine',lastname:'charrada',cin:'14028875',email: 'jaloul@gmail.com',number:'54701730', id:1}]);
    
    
   /* componentDidMount(){
      axios.get('').then((res)=>setclients({clients:res.data}))  
    };*/

    
    
    return(
<div className="home"><h4>customers:</h4>
      {clients.map(client => (
        <table className="table align-middle mb-0 bg-white" key={client.id}>
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
            <p className="fw-bold mb-1">{client.lastname}</p>
            <p className="text-muted mb-0">{client.name}</p>
          </div>
        
      </td>
      <td>
        <p className="fw-normal mb-1">{ client.email}</p>
        <p className="text-muted mb-0"> {client.number}</p>
      </td>
      
      <td>{client.cin}</td>
      <td>
      <Link to={`/client/${client.id}`}> <button type="button" className="btn btn-link btn-sm btn-rounded">
          Details
        </button></Link>
      </td>
    </tr>
  </tbody>
</table>
      ))}
    </div>
    );
}
export default Agent;