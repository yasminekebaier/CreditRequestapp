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
        <div className="client-preview" key={client.id} >
         
          <h2>{client.name}</h2>
          <h1>{client.lastname}</h1>
          <p> { client.cin }</p>
          <div className="flex space-x-4 ...">
          <button onClick={handleaccept} className="  bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-md  text-white">
  accept
</button>
 <button onClick={handlerefuse} className="  bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-md  text-white">
  refuse
</button></div>
       
          

        </div> )
  ));
}
 
export default Clientdetails;