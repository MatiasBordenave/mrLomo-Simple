import  { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import '../../styles/factura.css';

export const DetalleVenta = ({ idVenta }) => {
  const [detalleVenta, setDetalleVenta] = useState([]);

  const mostrarDetalleVenta = () => {
    axios
      .get("http://localhost:8000/detalleVenta/ventaLEti/" + idVenta)
      .then((resp) => {
        setDetalleVenta(resp.data);
      });
  };



  useEffect(() => mostrarDetalleVenta(), [idVenta]);

  return (
    <div className="container1">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nro Factura:</th>
            <th>Código de Producto:</th>
            <th>Nombre Producto:</th>
            <th>Categoria Producto:</th>
            <th>Cantidad:</th>
            <th>Subtotal:</th>
          </tr>
        </thead>

        <tbody>
          {detalleVenta.map((detalleVenta, index) => (
            <tr key={index}>
              <td>{detalleVenta.NumeroDeVenta}</td>
              <td>{detalleVenta.CodigoDeProducto}</td>
              <td>{detalleVenta.NombreDeProducto}</td>
              <td>{detalleVenta.CategoriaDeProducto}</td>
              <td>{detalleVenta.Cantidad}</td>
              <td>{detalleVenta.Subtotal}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DetalleVenta;