import { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import DetalleVenta from "./DetalleVenta";
import { NavPrincipal } from "../../constants/constants";
import '../../styles/factura.css';


export const ListadoVentas = () => {
  const [listadoVentas, setListadoVentas] = useState([]);
  const [detalleVentaId, setDetalleVentaId] = useState(null);

  const mostrarDetalle = (idVenta) => {
    setDetalleVentaId(idVenta);
  };

  const mostrarListadoVentas = () => {
    axios.get("http://localhost:8000/venta").then((resp) => {
      setListadoVentas(resp.data);
    });
  };
console.log(listadoVentas)

  useEffect(() => mostrarListadoVentas(), []);

  const TablaListado = (
    <div className="container">
      <NavPrincipal/>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Fecha y Hora</th>
            <th>Número de Venta</th>
            <th>Importe total:</th>
            <th>Detalle</th>
          </tr>
        </thead>

        <tbody>
          {listadoVentas.map((listadoVentas, index) => (
            <tr key={index}>
              <td>{listadoVentas.fechaYHora.slice(0,10)}</td>
              <td>{listadoVentas.idVenta}</td>
              <td>{listadoVentas.montoTotal}</td>
              <td>
                <button onClick={() => mostrarDetalle(listadoVentas.idVenta)}>
                  Ver Detalle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

  const TablaDetalle = detalleVentaId && (
    <DetalleVenta idVenta={detalleVentaId} />
  );

  return [TablaListado, TablaDetalle];
};

export default ListadoVentas;