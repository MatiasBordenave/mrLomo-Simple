import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/ventas.css';
import { NavPrincipal, VENTA_POST_JOIN, VENTA_GET_JOIN, formatearFecha, formatearFechaActual, Footer } from '../../constants/constants';

export function VentasRealizadas() {

  const [ventas, setVentas] = useState([])
  const [fechaInicio, setFechaInicio] = useState()
  const [fechaFinal, setFechaFinal] = useState()
  const [filtrado, setFiltrado] = useState(false)

   
console.log(fechaInicio+ "    " + fechaFinal)
  const getVentas = () =>{
    if(filtrado === true){
      axios.post(VENTA_POST_JOIN,{
        fechaInicio,
        fechaFinal
      })
      .then((resp)=>{
        setVentas(resp.data)
      })
    }
    else{
        axios.get(VENTA_GET_JOIN)
    
        .then((resp)=>{
          setVentas(resp.data)
        })

    }
  }

  const filtrarDia = ( filtro ) =>{
    setFechaInicio(formatearFecha(filtro))
    setFechaFinal(formatearFechaActual)
    getVentas()
  }

  const groupedData = {};

        ventas.forEach(item => {
          const date = item.fecha_venta ? item.fecha_venta.split('T')[0] : 'Fecha no disponible';
         
            if (!groupedData[date]) {
                groupedData[date] = [];
            }
            groupedData[date].push(item);
        });

  useEffect(() => {
   getVentas()
  
  }, [filtrado, fechaInicio,fechaFinal])

  return (
    <div className='divVentas'>
      <NavPrincipal/>
        <div className='row m-auto main'>
            <h2 className='glass2'>Ventas Realizadas</h2>
            <div>
              <button onClick={()=> {filtrarDia("dia"), setFiltrado(true)}}>Dia</button>
              <button onClick={()=> {filtrarDia("semana"), setFiltrado(true)}}>Semana</button>
              <button onClick={()=> {filtrarDia("mes"), setFiltrado(true)}}>Mes</button>
              <button onClick={()=> {filtrarDia(), setFiltrado(false)}}>Todos</button>
            </div>
          
          <div>
          <div className='row divTable'>
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
                              <tr  key={product.nombre} className='border-1 '>
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
        <Footer/>
    </div>
  )
}

export default VentasRealizadas