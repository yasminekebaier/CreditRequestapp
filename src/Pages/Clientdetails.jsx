import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbarr from "../Components/Navbar/Navbarr";
import LanguageContext from "../Components/Store/languageProvider";

const Clientdetails = () => {
  const [language, setLanguage] = useState("en");
  const [submitResult, setSubmitResult] = useState(null);
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const [client, setClient] = useState(null);
 
  useEffect(() => {
    console.log("ID from useParams:", id);
    axios.get(`http://localhost:4000/creditRequest/show/${id}`)
      .then((res) => {
        console.log("Response from API:", res.data); 
        setClient(res.data.creditRequest);
      })
      .catch((error) => {
        console.error("Error fetching client details:", error);
      });
  }, [id, submitResult]);

  const handleAccept = () => {
    axios.put(`http://localhost:4000/creditRequest/update/${id}`, { status: "Accepted",email: client.email ,comment: comment })
    .then((res) => {
      // Mettre à jour l'état du client avec le nouveau statut
      setClient((prevClient) => ({ ...prevClient, status: "Accepted" }));
    })
    .catch((error) => {
      console.error("Error accepting client:", error);
    });
  };

  const handleRefuse = () => {
    // Appel API pour refuser le client
    axios.put(`http://localhost:4000/creditRequest/update/${id}`, { status: "Refused",email: client.email ,comment: comment })
      .then((res) => {
        // Mettre à jour l'état du client avec le nouveau statut
        setClient((prevClient) => ({ ...prevClient, status: "Refused" }));
      })
      .catch((error) => {
        console.error("Error refusing client:", error);
      });
  };

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <LanguageContext.Provider value={{language:language,setLanguage:setLanguage}}>
        <Navbarr />
      </LanguageContext.Provider>
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
    <div className="card p-4" style={{ backgroundColor: ' #0c0f38', color: 'white', width: '90%', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="row align-items-center">
        <div className="col-md-3">
          {/* Image au milieu et à gauche */}
          <img src="/images/details.png" alt="Client" style={{ width: '500%', height: '500%', borderRadius: '50%' }} />
        </div>
        <div className="card p-4" style={{ backgroundColor: '#e0f2f7', color: 'black', width: '60%', minHeight: '40vh' }}>
          <div className="col-md-9">
        <h1 className="card-title mb-2" ><span style={{ fontWeight: 'bold', color: 'purple' }}>Name:</span> {client.name}</h1>
        <h2 className="card-subtitle mb-2 "><span style={{ fontWeight: 'bold', color: 'purple' }}>SurName:</span> {client.surname}</h2>
        <h2 className="card-subtitle mb-2 "><span style={{ fontWeight: 'bold', color: 'purple' }}>email:</span> {client.email}</h2>
        <h2 className="card-subtitle mb-2 "><span style={{ fontWeight: 'bold', color: 'purple' }}>phone_number:</span> {client.phone_number}</h2>
        <h2 className="card-text mb-2 "><span style={{ fontWeight: 'bold', color: 'purple' }}>cin_number:</span>  {client.cin_number}</h2>
        <h2 className="card-text mb-2"><span style={{ fontWeight: 'bold', color: 'purple' }}>City:</span>  {client.city}</h2>
        <h2 className="card-text mb-2"><span style={{ fontWeight: 'bold', color: 'purple' }}>addres:</span>  {client.addres}</h2>
        <h2 className="card-text mb-2"><span style={{ fontWeight: 'bold', color: 'purple' }}>birth_date:</span>  {client.birth_date}</h2>
        <h2 className="card-text mb-2"><span style={{ fontWeight: 'bold', color: 'purple' }}>job:</span>  {client.job}</h2>
        <h2 className="card-text mb-2"><span style={{ fontWeight: 'bold', color: 'purple' }}>zipCode: </span>  {client.zipCode}</h2>
        <h2 className="card-text mb-2"><span style={{ fontWeight: 'bold', color: 'purple' }}>Status:</span>  {client.status}</h2>
        <h2 className="card-text mb-2"><span style={{ fontWeight: 'bold', color: 'purple' }}> Amount:</span> {client.amount}</h2>
        <h2 className="card-text mb-2"><span style={{ fontWeight: 'bold', color: 'purple' }}>Month:</span>  {client.month}</h2>
       </div>
       </div>
       </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment..."
          className="form-control"
          style={{ backgroundColor: 'white', color: 'black', marginTop: '10px',width:'80%' }}
        /> 

        <div className="d-flex justify-content-between mb-3" style={{marginTop: '20px'}}>
          <button onClick={handleAccept} className="btn btn-outline-success" style={{ marginRight: '30px' }}>
            Accept
          </button>
          <button onClick={handleRefuse} className="btn btn-outline-danger">
            Refuse
          </button>
        </div>
      </div>
      </div> 
      </>
  );
};

export default Clientdetails;