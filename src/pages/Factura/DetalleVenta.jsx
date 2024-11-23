import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../../styles/factura.css";

export const DetalleVenta = ({ detalleVenta }) => {
  useEffect(() => {
    console.log(detalleVenta);
  }, [detalleVenta]);

  return (
    <div className="container1">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nro Factura:</th>
            <th>Nombre Producto:</th>
            <th>Cantidad:</th>
            <th>Precio Unitario:</th>
            <th>Subtotal:</th>
          </tr>
        </thead>

        <tbody>
          {detalleVenta?.productos.map((producto, index) => (
            <tr key={index}>
              <td>{detalleVenta.numeroVenta}</td>
              <td>{producto.nombre}</td>
              <td>{producto.cantidad}</td>
              <td>${producto.precio}</td>
              <td>${producto.cantidad * producto.precio}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DetalleVenta;
