 
import './Navbar.css'; // Importez le fichier CSS
import { Link } from "react-router-dom";
const Navbarr = () => {
  return (
    <nav className="navbar">
      <h1 className="nav-title">bank credit</h1>
      <div className="nav-buttons">
      <Link className="nav-button home-button" to="/">customer</Link>
      <Link className="nav-button about-button" to="/agent">agent</Link>
         
        
      </div>
    </nav>
  );
};

export default Navbarr;