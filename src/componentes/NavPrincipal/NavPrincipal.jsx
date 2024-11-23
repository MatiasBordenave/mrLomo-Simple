import { Link, useLocation } from "react-router-dom";
import "../../styles/navPstyle.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useEffect, useState } from "react";

export function NavPrincipal() {
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <>
      <div className="bodyNav">
        <Navbar expand="lg" className="mainNav">
          {/* Botón de hamburguesa */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="hamburger-button">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              {/* Enlace Home */}
              <Nav.Link as={Link} to="/" className={activeLink === '/' ? 'active' : ''}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/Ventas" className={activeLink === '/Ventas' ? 'active' : ''}>
                Nueva Venta
              </Nav.Link>
              <Nav.Link as={Link} to="/ListadoVentas" className={activeLink === '/ListadoVentas' ? 'active' : ''}>
                Facturas Realizadas
              </Nav.Link>
              <Nav.Link as={Link} to="/Producto" className={activeLink === '/Producto' ? 'active' : ''}>
                Lista de Productos
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}

export default NavPrincipal;

