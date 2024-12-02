import { useState } from "react";
import Table from "react-bootstrap/Table";
import { Footer, NavPrincipal, DetalleVenta } from "../../constants/constants";
import "../../styles/factura.css";

const ventas = [
  {
    id: 1,
    fechaYHora: "2024-11-22 14:30",
    numeroVenta: "V001",
    importeTotal: "$3600",
    productos: [
      { nombre: "Hamburguesa Clásica", cantidad: 2, precio: 1200 },
      { nombre: "Gaseosa 500ml", cantidad: 2, precio: 600 },
    ],
  },
  {
    id: 2,
    fechaYHora: "2024-11-23 16:00",
    numeroVenta: "V002",
    importeTotal: "$3100",
    productos: [
      { nombre: "Milanesa Completa", cantidad: 1, precio: 1300 },
      { nombre: "Papas Fritas", cantidad: 1, precio: 700 },
      { nombre: "Cerveza Artesanal 330ml", cantidad: 2, precio: 900 },
    ],
  },
  {
    id: 3,
    fechaYHora: "2024-11-24 10:15",
    numeroVenta: "V003",
    importeTotal: "$2700",
    productos: [
      { nombre: "Sándwich de Lomito", cantidad: 1, precio: 1500 },
      { nombre: "Gaseosa 500ml", cantidad: 2, precio: 600 },
    ],
  },
];

export const ListadoVentas = () => {
  const [detalleVenta, setDetalleVenta] = useState(null); // Estado para la venta seleccionada

  const mostrarDetalle = (id) => {
    const ventaSeleccionada = ventas.find((venta) => venta.id === id);
    setDetalleVenta(ventaSeleccionada); // Guarda la venta seleccionada
  };

  const handleVolverAtras = () => {
    setDetalleVenta(null);
  };

  return (
          <>
        <NavPrincipal />
        <div className="row col-11 glass m-auto div_Factura">
          <div className="header-section">
            <h3>Factura</h3>
          </div>
          {!detalleVenta ? (
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Fecha y Hora</th>
                    <th>Número de Venta</th>
                    <th>Importe total</th>
                    <th>Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {ventas.map((venta) => (
                    <tr key={venta.id}>
                      <td>{venta.fechaYHora.slice(0, 10)}</td>
                      <td>{venta.numeroVenta}</td>
                      <td>{venta.importeTotal}</td>
                      <td>
                        <button onClick={() => mostrarDetalle(venta.id)}>
                          Ver Detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div>
              <DetalleVenta detalleVenta={detalleVenta} />
              <button onClick={handleVolverAtras}>Volver</button>
            </div>
          )}
        </div>
        <Footer />
      </>

  );
};

export default ListadoVentas;
