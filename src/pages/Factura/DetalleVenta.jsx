import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../../styles/factura.css";

export const DetalleVenta = ({ detalleVenta }) => {
  useEffect(() => {}, [detalleVenta]);

  // Calcular el total de la venta
  const totalVenta = detalleVenta?.productos.reduce(
    (acc, producto) => acc + producto.cantidad * producto.precio,
    0
  );

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

        {/* Agregar un pie de tabla para el total */}
        <tfoot>
          <tr>
            <td colSpan="4" style={{ textAlign: "right", fontWeight: "bold" }}>
              Total:
            </td>
            <td style={{ fontWeight: "bold" }}>${totalVenta}</td>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};

export default DetalleVenta;

