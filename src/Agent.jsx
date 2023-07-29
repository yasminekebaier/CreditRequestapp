import axios from "axios";
import { useState } from "react";
import { Link } from 'react-router-dom';

function Agent (){
    
    const [clients,setclients] = useState([{name:'amine',lastname:'charrada',cin:'14028875',id:1}]);
    
    
   /* componentDidMount(){
      axios.get('').then((res)=>setclients({clients:res.data}))  
    };*/

    
    
    return(
<div className="home"><h4>customers:</h4>
      {clients.map(client => (
        <div className="client-preview" key={client.id} >
        <Link to={`/client/${client.id}`}>
          <h2>{client.name}</h2>
          <p> { client.cin }</p>
          </Link>
        </div>
      ))}
    </div>
    );
}
export default Agent;