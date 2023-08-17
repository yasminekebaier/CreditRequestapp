import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Clientdetails = () => {
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
  }, [id]);

  const handleAccept = () => {
    axios.put(`http://localhost:4000/creditRequest/update/${id}`, { status: "Accepted" })
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
    axios.put(`http://localhost:4000/creditRequest/update/${id}`, { status: "Refused" })
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
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{client.name}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{client.surname}</h6>
        <p className="card-text">{client.cin_number}</p>
        <div className="flex space-x-4 ...">
          <button onClick={handleAccept} className="btn btn-outline-primary">
            Accept
          </button>
          <button onClick={handleRefuse} className="btn btn-outline-primary">
            Refuse
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clientdetails;