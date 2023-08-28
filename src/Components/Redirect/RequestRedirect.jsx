import React, { useState, useEffect, Fragment } from "react";
import Navbarr from "../Navbar/Navbarr";
import LanguageContext from "../Store/languageProvider";
import axios from "axios";

const RequestRedirect = () => {
    const [requestData, setRequestData] = useState(null);
    const [language, setLanguage] = useState("en");
    const info_text = "Your Request is in a pending status.Our bancking agent will review the data provided.You will recieve a response whithin maximum two days.Check out your maibox. "
    const [text, setText] = useState(info_text)
    const  [owner,setOwner]= useState("")
    const[isHidden, setIsHidden ]=useState("false")

    const handleRequest=(event)=>{
        event.preventDefault(); 

    }
    useEffect(() => {
        // Récupérer les données de la base de données
        axios.get("http://localhost:4000/creditRequest/show")
            .then(response => {
                setRequestData(response.data); // Mettre à jour le state avec les données récupérées
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);
    return (
        <>
        <LanguageContext.Provider value={{language:language,setLanguage:setLanguage}}>
        <Navbarr />
      </LanguageContext.Provider>
        <Fragment>

            <div className="container py-2 h-100">
                {/* Alert  label  */}
                <div className="row d-flex justify-content-center align-items-center text-white">
                    <div className="col col-xl-12 ">
                        <div className="card  " style={{ "borderRadius": "10px", "backgroundColor": "#8955EF" }}>
                            <div className="card-body p-4">
                                <div className="row ">
                                    <div className="col d-flex align-items-center">
                                        <i className="bi bi-info-circle text-white fs-3 me-2"></i>
                                        <h3 className="mb-0 text-white">Credit request info </h3>
                                    </div>
                                    <hr className="my-1 text-white" />
                                    <p className="text-white mx-3 mt-2">{text} </p>
                                </div>





                            </div>
                        </div>

                    </div>
                </div>
                {/* Button Request */}
                <div className="">
                </div>
                <button type="button" className="btn btn-primary float-end my-3"style={{"backgroundColor":"#9c30a4"}} onClick={handleRequest}>Request </button>
              
                {/* Content  of requests  */}
                <table className="table align-middle mb-0 bg-white">
                    <thead className="bg-light">
                        <tr>
                            <th>Request  </th>
                            <th>phone_number </th>
                            <th>cin_number</th>
                            <th>status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td>
                                <div className="d-flex align-items-center">
                                    <div className="ms-3">
                                        <p className="fw-bold mb-1">
                                        Ahmed safta
                                        </p>
                                        <p className="text-muted mb-0">ahmed.safta@gmail.com</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p className="fw-normal mb-1">Software engineer</p>
                                <p className="text-muted mb-0">IT department</p>
                            </td>
                            <td>
                                <span className="badge badge-success rounded-pill d-inline">Active</span>
                            </td>
                            <td>Senior</td>
                            <td>
                                <button type="button" className="btn btn-link btn-sm btn-rounded">
                                    Edit
                                </button>
                            </td>
                        </tr> */}
                        {requestData && requestData.map(request => (
                    <tr >
                        <td>
                                <div className="d-flex align-items-center">
                                    <div className="ms-3">
                                        <h2 className="fw-bold mb-1">
                                        {request.name}
                                        </h2>
                                        <h2 className="text-muted mb-0">{request.email}</h2>
                                    </div>
                                </div>
                            </td>
                        <td>
                                <h2 className="fw-normal mb-1">{request.phone_number}</h2>
                                <h2 className="text-muted mb-0">{request.job}</h2>
                            </td>
                        <td>{request.cin_number}</td>
                        <td>
                                <span className="badge badge-success rounded-pill d-inline">{request.status}</span>
                            </td>
                            
                        <td>
                                <button type="button" className="btn btn-link btn-sm btn-rounded">
                                    Edit
                                </button>
                            </td>
                    </tr>
                     ))}
                    </tbody>
                </table>








            </div>


        </Fragment>
        </>
    )
}
export default RequestRedirect; 