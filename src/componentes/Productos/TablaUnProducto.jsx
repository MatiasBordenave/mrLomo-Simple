import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PRODUCTO_GET } from '../../constants/constants'


export function TablaUnProducto({ idProducto, handleVolver, handleAgregarDetalleVenta, mostrarComponente }) {


    const[unProducto, setUnProducto] = useState([])
    const[auxId, setAuxId] = useState(0)
    const[auxComponente, setAuxComponente] = useState(0)
    const [contador, setContador] = useState(1)


      const handleRestar = () =>{
                contador < 1 ? setContador(0) : setContador(contador - 1)
      }
            
      const handleSumar = () =>{
                contador > 98 ? setContador(99) : setContador(contador + 1)
      }

    
    const handleUnProducto = ( ) =>{
      setAuxId(idProducto)
      setAuxComponente(mostrarComponente)
      auxComponente  === false && (

        axios.get(PRODUCTO_GET + auxId)
        .then((resp)=> setUnProducto(resp.data)
        )
      )
    }

    useEffect(() => {   
      handleUnProducto()
    }, [auxId, auxComponente])

    
  // useEffect(() => {
  //   const filteredProduct = producto.find((p) => p.codProducto === idProducto);
  //   setUnProducto(filteredProduct  || {});
  // }, [idProducto, producto]);

    

  return (
    <div className='unProducto'>
      <div className=' button-volver'>
        <button className='' onClick={handleVolver}>Volver</button>

      </div>
      <div  className='row col-12'>
        <ul  className=''>
                    {
                       unProducto.map(unProducto=>{
                        return(
                            <li className='liTituloProducto' key={unProducto.codProducto}>                                    

                            <div className='divMap'>
                              <div className='divPTituloProd'>
                                <h3 className='pTituloProducto'>{unProducto.nombre}</h3> 
                              </div>

                              <div className='divBtnProducto'>
                                  <button className='btnHandler' onClick={handleRestar}>-</button> 
                                  <input className='inputProducto' type='number' autoFocus value={contador} onChange={(e)=>{setContador(e.target.value)}}></input> 
                                  <button className='btnHandler' onClick={handleSumar}>+</button>    
                                  <button onClick={() => handleAgregarDetalleVenta(unProducto, contador)}>Agregar</button>

                              </div>

                            </div>
                                <div className='descripcion'>
                                  <p>{unProducto.descripcion}</p>
                                </div>                                                          
                            </li>          
                        )
                       })          
                      }           
        </ul>
      </div>
    </div>
  )
}

export default TablaUnProducto