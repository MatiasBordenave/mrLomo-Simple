import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PRODUCTO_GET } from '../../constants/constants'

import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';


import { Form } from 'react-router-dom'
export function TablaUnProducto({ idProducto, handleVolver, handleAgregarCarrito, mostrarComponente, productos }) {
  

    const [unProducto, setUnProducto] = useState(null); // No es un array, es un objeto

    const[unProductoArray, setUnProductoArray] = useState([])
    const[auxId, setAuxId] = useState(0)
    const[auxComponente, setAuxComponente] = useState(0)
    const [contador, setContador] = useState(1)
    const [observacion, setObservacion] = useState(1)
  
    /*agregados*/
    const [agregados, setAgregados] = useState([])
    const [select, setSelect] = useState([])

      const handleRestar = () =>{
                contador < 1 ? setContador(0) : setContador(contador - 1)
      }
            
      const handleSumar = () =>{
                contador > 98 ? setContador(99) : setContador(contador + 1)
      }

    
      const handleUnProducto = () => {
        const producto = productos.find((producto) => producto.id === idProducto);
        setUnProducto(producto);  // Esto ya es un objeto
      }
      
      
    const getAgregados = () =>{
      axios.get(`http://localhost:8000/detalleVenta/agregados`)
      .then((resp)=>{
        setAgregados(resp.data)
      })  
    }
    
    useEffect(() => {   
      handleUnProducto()

    }, [unProducto])

    
  // useEffect(() => {
  //   const filteredProduct = producto.find((p) => p.codProducto === idProducto);
  //   setUnProducto(filteredProduct  || {});
  // }, [idProducto, producto]);

  const handleChange = (event) =>{

    const {value, checked} = event.target;
    if(checked) {

      setSelect([...select, value]);
    }else{
      setSelect(select.filter((o) => o !== value))
    }

    
  }

  
    

  return (
    <div className='unProducto'>
      <div className=' button-volver'>
        <button className='' onClick={handleVolver}>Volver</button>

      </div>
      <div  className='row col-12'>
        <ul  className=''>
                    {
                      unProducto &&
                      
                      
                          <li className='liTituloProducto' key={unProducto.id}>
  <div className='divMap'>
    <div className='divPTituloProd'>
      <h3 className='pTituloProducto'>{unProducto.nombre}</h3> 
    </div>

    <div className='divBtnProducto'>
      <button className='btnHandler' onClick={handleRestar}>-</button> 
      <input 
        className='inputProducto' 
        type='number' 
        autoFocus 
        value={contador} 
        onChange={(e) => setContador(e.target.value)} 
      />
      <button className='btnHandler' onClick={handleSumar}>+</button>
    </div>       
  </div>
  <div className='descripcion'>
    <p>{unProducto.descripcion} --- ${unProducto.precio}</p>
  </div>
  {unProducto.stockeable === "NO" && (
    <div>
      <label>Descripcion</label>  
      <input 
        type="text" 
        placeholder='Texto libre' 
        onChange={(e) => setObservacion(e.target.value)} 
      />
      <ul>
        {agregados.map((agregado) => (
          <li key={agregado.codAgregado}>
            <label htmlFor={`checkbox_${agregado.codAgregado}`}>
              <input
                type="checkbox"
                id={`checkbox_${agregado.codAgregado}`}
                value={agregado.nombre}
                onChange={handleChange}
              />
              {agregado.nombre}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )}
  <button onClick={() => handleAgregarCarrito(unProducto, contador, select, observacion)}>
    Agregar
  </button>
</li>

                                 
                      }           
        </ul>
      </div>
    </div>
  )
}

export default TablaUnProducto