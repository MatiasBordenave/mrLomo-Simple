import { Link, useLocation } from "react-router-dom";
import "../../styles/navPstyle.css";
import Home from "./Home";
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


    
  const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
    
  return (
    <>
    <div className="bodyNav">
      <Navbar expand="lg" className="  mainNav " >
          <Navbar.Collapse className="" >
            <Nav className="m-auto" >
              <NavDropdown title="Ventas" id="basic-nav-dropdown" 
                    className={activeLink === '/Ventas' ||  activeLink === '/VentasRealizadas'  ? 'active' : ''}>
                <NavDropdown.Item href="/Ventas"
                
                className={activeLink === '/Ventas' ? 'active' : ''}
                    >
                  Nueva Venta
                </NavDropdown.Item>
                <NavDropdown.Item href="/VentasRealizadas"
                className={activeLink === '/VentasRealizadas' ? 'active' : ''}
                 >
                  Ventas Realizadas
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/ListadoVentas"
              
            className={activeLink === '/ListadoVentas' ? 'active' : ''}
              >Facturas Realizadas</Nav.Link>

              <Nav.Link href="/TablaStock"
              
            className={activeLink === '/TablaStock' ? 'active' : ''}
            >Stock Disponible</Nav.Link>

              <Nav.Link href="/Producto"
               className={activeLink === '/Producto' ? 'active' : ''}>Lista de Productos</Nav.Link>

              <Nav.Link href="/Caja"  className={activeLink === '/Caja' ? 'active' : ''}>Ver caja</Nav.Link>
            </Nav>
          </Navbar.Collapse>

      </Navbar>
    </div>

    
{/* <div className="bodyNav">
      <Navbar expand="lg" className="  mainNav " >
          <Navbar.Collapse className="" >
            <Nav  variant="tabs" className="m-auto"  >
              <NavDropdown title="Ventas" id="basic-nav-dropdown" >
                <NavDropdown.Item href="/Ventas"
                    >
                  Nueva Venta
                </NavDropdown.Item>
                <NavDropdown.Item href="/VentasRealizadas" >
                  Ventas Realizadas
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/ListadoVentas" >Facturas Realizadas</Nav.Link>

              <Nav.Link href="/TablaStock">Stock Disponible</Nav.Link>

              <Nav.Link href="/Producto" >Lista de Productos</Nav.Link>

              <Nav.Link href="/Caja" >Ver caja</Nav.Link>
            </Nav>
          </Navbar.Collapse>

      </Navbar>
    </div> */}
    </>
  );
}
export default NavPrincipal;
