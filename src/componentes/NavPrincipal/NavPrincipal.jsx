import { Link, useLocation } from "react-router-dom";
import "../../styles/navPstyle.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
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
          <Navbar.Collapse>
            <Nav className="m-auto">
              <NavDropdown
                title="Ventas"
                id="basic-nav-dropdown"
                className={activeLink === '/Ventas' || activeLink === '/VentasRealizadas' ? 'active' : ''}
              >
                <NavDropdown.Item as={Link} to="/Ventas" className={activeLink === '/Ventas' ? 'active' : ''}>
                  Nueva Venta
                </NavDropdown.Item>
                {/* 
                <NavDropdown.Item as={Link} to="/VentasRealizadas" className={activeLink === '/VentasRealizadas' ? 'active' : ''}>
                  Ventas Realizadas
                </NavDropdown.Item> 
                */}
              </NavDropdown>
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
