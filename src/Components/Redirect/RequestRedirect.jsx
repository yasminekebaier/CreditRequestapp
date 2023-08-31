import React, { useState, useEffect, Fragment } from "react";


import Navbarr from "../Navbar/Navbarr";
import LanguageContext from "../Store/languageProvider";
import {Navigate,useNavigate} from 'react-router-dom';
import axios from "axios";

const RequestRedirect = () => {
    const [requestData, setRequestData] = useState(null);
    const [language, setLanguage] = useState("en");
    const info_text = "Your Request is in a pending status.Our bancking agent will review the data provided.You will recieve a response whithin maximum two days.Check out your maibox. "
    const noRequestText = "You have not created any request yet.Create a credit request by hitting the button request!"
    const [text, setText] = useState(info_text);
 
    const [isHidden, setIsHidden] = useState(true);
    const owner = localStorage.getItem("userName");
    const isLoggedIn= localStorage.getItem("isLoggedIn");
    const navigate =useNavigate()

    console.log("the isLogged in item ",isLoggedIn); 



    // Handle Color change 

    const handleRequest = (event) => {
        event.preventDefault();
        navigate("/manual"); 

    }
    useEffect(() => {
        // Récupérer les données de la base de données
    
        axios.get('http://localhost:4000/creditRequest/home',{ params: { owner: owner} })
            .then(response => {
                setRequestData(response.data.creditRequest);
                if (response.data.creditRequest.length==0){
                    setText(noRequestText); 
                }
                console.log("the response length  is ",response.data.creditRequest.length);
                response.data.creditRequest.map(request => {

                    if (request.status == "Pending") {
                        setIsHidden(false);
                        console.log("the is Hidden ")
                    }
                })// Mettre à jour le state avec les données récupérées
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

// formik implementation  




    return (
        <Fragment>
            <LanguageContext.Provider value={{ language: language, setLanguage: setLanguage }}>
                <Navbarr  />
            </LanguageContext.Provider>
            { isLoggedIn=="false"?(
            <Navigate to="/" replace={true} />
            ):
                
            <div className="container py-2 h-100">
            {/* Alert  label  */}
            <div className="row d-flex justify-content-center align-items-center text-white">
                <div className="col col-xl-12 ">
                    <div className="card  " style={{ "borderRadius": "10px", "backgroundColor": "#8955EF" }}>
                        <div className="card-body p-4">
                            <div className="row ">
                                <div className="col d-flex align-items-center">
                                    <i className="bi bi-info-circle text-white fs-2 me-2"></i>
                                    <h3 id="h3elelement" className="mb-0 text-white mt-1">Credit request info </h3>
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
            <button type="button" className="btn btn-primary float-end my-3" hidden={!isHidden} style={{ "backgroundColor": "#9c30a4" }} onClick={handleRequest}>Request </button>

            {/* Content  of requests  */}
            <table className="table align-middle mb-0 bg-white mt-3">
                <thead className="bg-light">
                    <tr>
                        <th>Request ID  </th>
                        <th>Request owner</th>
                        <th>Status</th>

                    </tr>
                </thead>
                <tbody>

                    {requestData && requestData.map(request => (


                        <tr >
                            <td>
                                <div className="d-flex align-items-center">
                                    <div className="ms-3">
                                        <h2 className="fw-bold mb-1">
                                            {request._id}
                                        </h2>

                                    </div>
                                </div>
                            </td>
                            <td>
                                <h2 className="fw-normal mb-1">{request.owner}</h2>

                            </td>


                            <td>
                                {request.status === 'Accepted' ? (
                                    <span className="badge badge-success rounded-pill d-inline">{request.status}</span>
                                ) : request.status === 'Deny' ? (
                                    <span className="badge badge-danger rounded-pill d-inline">{request.status}</span>
                                ) : (
                                    <span className="badge badge-primary rounded-pill d-inline">{request.status}</span>
                                )}
                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
            }



        </Fragment>

    )
}
export default RequestRedirect; 