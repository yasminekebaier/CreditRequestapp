import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbarr from "../Components/Navbar/Navbarr";
import LanguageContext from "../Components/Store/languageProvider";
import { useNavigate } from 'react-router-dom';

const Clientdetails = () => {
  const [language, setLanguage] = useState("en");
  const [submitResult, setSubmitResult] = useState(null);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const navigate = useNavigate();
 
  useEffect(() => {
    // Vérifiez si l'utilisateur est connecté
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem('role');

    if (isLoggedIn === "false" || !role) {
      // Redirigez l'utilisateur vers la page d'accueil s'il n'est pas connecté ou n'a pas de rôle
      navigate('/', { replace: true });
    } else {
      // Utilisateur connecté, continuez avec le chargement des données du client
      axios.get(`http://localhost:4000/creditRequest/show/${id}`)
        .then((res) => {
          console.log("Response from API:", res.data); 
          setClient(res.data.creditRequest);
        })
        .catch((error) => {
          console.error("Error fetching client details:", error);
        });
    }
  }, [id, submitResult, navigate]);


  const handleAccept = () => {
    axios.put(`http://localhost:4000/creditRequest/update/${id}`, { status: "Accepted",email: client.email ,comment: comment })
    .then((res) => {
      // Mettre à jour l'état du client avec le nouveau statut
      setClient((prevClient) => ({ ...prevClient, status: "Accepted" }));
      // Mettre à jour le message
      setMessage('Email sent to the client.');
      // Indiquer que le bouton a été cliqué
      setIsButtonClicked(true);
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
        setMessage('Email sent to the client.');
        // Indiquer que le bouton a été cliqué
        setIsButtonClicked(true);
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
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' , marginTop:'20px'}}>
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
        <div className="text-center" style={{ marginTop: '20px' }}>
        {isButtonClicked && (
        <div className="message">{message}</div>
      )}
      </div>
      </div>
      </div> 
      </>
  );
};

export default Clientdetails;