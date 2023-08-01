 
import './Navbar.css'; // Importez le fichier CSS
import { Link } from "react-router-dom";


const Navbarr = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img className="logo" src="./images/logo.png" alt="Logo de l'application" />
        <h1 className="nav-title1">creditWise</h1>
      </div>
      <div className="nav-links">
        <Link className="nav-title" to="/">Accueil</Link>
        <Link className="nav-title" to="/login">Client</Link>
        <Link className="nav-title" to="/agent">Agent</Link>
      </div>
    </nav>
  );
};

export default Navbarr;