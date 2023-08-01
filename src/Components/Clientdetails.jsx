import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
 
 
const Clientdetails = () => {
    const { id } = useParams();
    const [clients,setclients] = useState([{name:'amine',lastname:'charrada',cin:'14028875',id:1}]);
  
  
    /*componentDidMount(){
        axios.get(''+{id}).then((res)=>setclients({clients:res.data}))  
      }; */
  
  const handleaccept=( )=>{
    axios.delete(''+{id}).then((res)=>console.log(res.data))


  }; 
  const handlerefuse=()=>{
    axios.delete(''+{id}).then((res)=>console.log(res.data))


  }
  
  
  
    return (  
    clients.map(client => (  
      <div className="card" key={client.id}>
  <div className="card-body">
    <h5 className="card-title">{client.name}</h5>
    <h6 className="card-subtitle mb-2 text-body-secondary">{client.lastname}</h6>
    <p className="card-text">{ client.cin }.</p>
    <div className="flex space-x-4 ...">
          <button onClick={handleaccept} className=" btn btn-outline-primary">
  accept
</button>
 <button onClick={handlerefuse} className=" btn btn-outline-primary">
  refuse
</button></div>







  </div>
</div> )
  ));
}
 
export default Clientdetails;