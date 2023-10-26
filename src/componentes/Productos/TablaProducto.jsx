import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import {  CATEGORIA_GET, PRODUCTO_GET } from '../../constants/constants';

export function TablaProducto({ productos, handleAgregar, categoria, mostrarTodos }) {

    const [prodPorCat, setProdPorCat] = useState([])
    const [auxCat, setAuxCat] = useState()


    TablaProducto.propTypes = {
        productos: PropTypes.array.isRequired, 
    }

    
 

    
    useEffect(() => {
        const getProductosPorCategoria = () =>{

            setAuxCat(categoria)
            mostrarTodos ?(
                axios.get(PRODUCTO_GET)
                .then((resp)=>{
                    setProdPorCat(resp.data)
                })           
            )
            :(
                axios.get(CATEGORIA_GET + auxCat)
                .then((resp)=>{
                    setProdPorCat(resp.data)
                })
            )
        }
        
        getProductosPorCategoria()
        setAuxCat(categoria)
    }, [categoria, auxCat, mostrarTodos])

  return (

      <div>  
         <ul className='tarjeta'>
                            {
                           
                               prodPorCat.map((productos, index) =>{ 

                                return(
                                    <li className='liTitulo' key={index}>                                    
                                                <p>{productos.codProducto}</p>
                                                <p className='pTitulo'>{productos.nombre}</p> 
                                                <button onClick={() => handleAgregar(productos.codProducto)}>Agregar</button>
                                    </li>
                                )                                            
                                })
                            }
            </ul>
        </div>
  )
}

export default TablaProducto