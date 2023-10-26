import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/ventas.css';
import { NavPrincipal, VENTA_GET_JOIN } from '../../constants/constants';

export function VentasRealizadas() {

  const [ventas, setVentas] = useState([])

  const getVentas = () =>{
    axios.get(VENTA_GET_JOIN)
    .then((resp)=>{
      setVentas(resp.data)
    })
  }

  const groupedData = {};

        ventas.forEach(item => {
            const date = item.fecha_venta.split('T')[0];
            if (!groupedData[date]) {
                groupedData[date] = [];
            }
            groupedData[date].push(item);
        });

  useEffect(() => {
   getVentas()
  }, [])

  return (
    <div className='divVentas'>
      <NavPrincipal/>
        <div className='row m-auto main'>
            <h2 className='glass2'>Ventas Realizadas</h2>
          
          <div>
          <div className='row'>
            <table className='glass2 m-auto col-10 border-1'>
                  <thead className='border-1'>
                      <tr className='border-1'>
                          <th className='border-1'>Fecha</th>
                          <th className='border-1'>Nombre del Producto</th>
                          <th className='border-1'>Total Vendido</th>
                      </tr>
                  </thead>
                  <tbody  className='border-1'>
                      {Object.keys(groupedData).map(date => (
                          groupedData[date].map((product, index) => (
                              <tr key={product.nombre} className='border-1'>
                                  {index === 0 && (
                                      <td rowSpan={groupedData[date].length}>{date}</td>
                                  )}
                                  <td  className='border-1'>{product.nombre}</td>
                                  <td  className='border-1'>{product.total_vendido}</td>
                              </tr>
                          ))
                      ))}
                  </tbody>
              </table>
          </div>
          </div>
        
        </div>
    </div>
  )
}

export default VentasRealizadas