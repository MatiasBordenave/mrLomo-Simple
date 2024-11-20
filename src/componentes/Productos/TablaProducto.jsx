import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import { PRODUCTO_GET } from '../../constants/constants';

export function TablaProducto({ productos, handleAgregar, mostrarTodos }) {

    const [prodPorCat, setProdPorCat] = useState([])
    const [auxCat, setAuxCat] = useState()


    TablaProducto.propTypes = {
        productos: PropTypes.array.isRequired, 
    }

    
 

  return (

      <div>  
        <h1></h1>
         <ul className='tarjeta'>
                            {
                           productos &&  productos.map((productos, index) =>{ 

                                return(
                                    <li className='liTitulo' key={index}>                                    
                                                <p>{productos.codProducto}</p>
                                                <p className='pTitulo'>{productos.nombre}</p> 
                                                <button onClick={() => handleAgregar(productos.id)}>Agregar</button>
                                    </li>
                                )                                            
                                })
                            }
            </ul>
        </div>
  )
}

export default TablaProducto