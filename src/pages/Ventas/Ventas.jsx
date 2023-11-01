import axios from 'axios'
import React, { useEffect, useState } from 'react'

import '../../styles/ventas.css';
import { CATEGORIA_GET, DETALLEVENTA_DELETE, DETALLEVENTA_DELETE_ALL, DETALLEVENTA_GET_VENTA, DETALLEVENTA_POST, FACTURA_GET_NUM, NavPrincipal, PRODUCTO_GET, TOTAL_GET_SUMA, VENTA_POST } from '../../constants/constants';
import { TablaProducto, TablaUnProducto } from "../../constants/constants"

export function Ventas() {    
    


    const [productos, setProductos] = useState([])

    const [productoPorVenta, setProductoPorVenta] = useState([])    
    const [idProducto, setIdProducto] = useState(1)
    const [idProd, setIdProd] = useState(0)
    

    const [categoria, setCategoria] = useState([])
    const [categoriasArray, setCategoriasArray] = useState([])

    const [numFactura, setNumFactrura] = useState(0)
    const [total, setTotal] = useState(0)

    
    const [mostrarComponente, setMostrarComponente] = useState(true);
    const [mostrarTodos, setMostrarTodos] = useState(true);

    
    const handleAgregar = (id) =>{
        setMostrarComponente(!mostrarComponente)
        setIdProducto(id)     
    }
    const handleVolver = () =>{      
        setMostrarComponente(!mostrarComponente)
    }
  
     const getProductos = () =>{
      
        axios.get(PRODUCTO_GET)
        .then((resp)=>{
              setProductos(resp.data)
            })   
    }    

    const getTotal = () =>{
        axios.get(TOTAL_GET_SUMA + numFactura)
        .then((resp) =>{
            setTotal(resp.data[0].suma)
        })
    }
    const getNumFactura = () =>{
        axios.get(FACTURA_GET_NUM)
        .then((resp)=>{
            setNumFactrura(resp.data[0].Contar+1)
            })  
        }


    const getCategorias = () =>{
        axios.get(CATEGORIA_GET)
        .then((resp)=>{
            setCategoriasArray(resp.data)
            }) 
    }
 
    const handleQuitar = (id) =>{
        axios.delete(DETALLEVENTA_DELETE + id)
        .then(()=>{
            alert("Se elimino un pedido")
            getProductoPorVenta()
            getTotal()
            getNumFactura()
        })
    }

    const handleCancelar= () =>{

        if( productoPorVenta.length >  0){

            axios.delete(DETALLEVENTA_DELETE_ALL + numFactura)
            .then(()=>{
                getProductoPorVenta()
            })
        }else(alert("No hay productos para realizar la venta"))
    }

    const handleFinalizarVenta = (  ) =>{
        if( productoPorVenta.length >  0){
        const fechaActual = new Date()        
        const fechaYHoraFormateada = fechaActual.toISOString();
        const fechaHoraSinMilisegundos = fechaYHoraFormateada.slice(0, -5);

            axios.post( VENTA_POST,
            {            
                montoTotal: total,
                fechaYHora: fechaHoraSinMilisegundos
            }).then((resp) => {
                getNumFactura()
                setTotal(null)
                alert("se realizo la venta")
                }
            )
        }else(alert("No hay productos para realizar la venta"))
    }

    const getProductoPorVenta = () =>{
        axios.get(DETALLEVENTA_GET_VENTA + numFactura)
        .then((resp) => {
            setProductoPorVenta(resp.data)
        })
    }
   
    const handleAgregarDetalleVenta = ( unProducto, contador ) =>{

        if(contador > 0){
            axios.post(DETALLEVENTA_POST,{
    
                cod_Producto: unProducto.codProducto,
                id_Venta: numFactura,
                cantidad: contador,
                subTotal: (contador*unProducto.precio)
    
            })
            setIdProd(idProd + 1) 
            setMostrarComponente(true)
            getTotal()
            getNumFactura()
        }else alert("Debe ingresar una cantidad")
        }

    useEffect(() => {
        getProductos()  
        getNumFactura()
        getTotal()
        getProductoPorVenta()
        getCategorias()
    }, [ idProd, total, mostrarTodos,categoria])

    return (
        <div className='divVentas'>
            <NavPrincipal/>
        <h2 className='glass2'>Ventas</h2>
            <div className='row m-auto main'>

                <nav className='col-lg-2'>
                    <div className='divNavCategoria glass2'>
                        <h5>Categorias</h5>
                        <ul className='ulDeslizable2'>
                            { categoriasArray.length > 0 ?(
                                <>
                                    <li><button onClick={() =>(setMostrarTodos(true), setMostrarComponente(true))}>Todos</button></li>
                                    
                                        {categoriasArray.map((categoria) =>
    
                                            <li key={categoria.idCategoria}> 
                                                    <button onClick={()=>{(setCategoria(categoria.idCategoria)), setMostrarTodos(false), setMostrarComponente(true)}}>{categoria.nombre}</button>                                                                                                                                   
                                            </li>                                    
                                        )}
                                </>
                            )
                            : (<p>No hay productos...</p>)}
                        </ul>

                    </div>
                </nav>
                <main className='col-lg-6'>
                    <article className='col-12 glass2 productos'>
                    { mostrarComponente ? <TablaProducto productos={productos} categoria={categoria} handleAgregar={handleAgregar} mostrarTodos={mostrarTodos}/> : <TablaUnProducto mostrarComponente={mostrarComponente} idProducto={idProducto} handleVolver={handleVolver} handleAgregarDetalleVenta={handleAgregarDetalleVenta} />}
                        
                    </article>
                </main>
                <aside className='col-lg-4'>
                    <div className='glass2 divFactura'>
                        <h5>Numero de factura {numFactura}</h5>
                        <ul className='ulDeslizable2'>
                            {
                            
                                productoPorVenta.map((producto)=>
                                
                                
                                <li className='border-1' key={producto.idDetalleVenta}> 
                                        <p> {producto.cantidad}  -- {producto.nombre} -- {producto.precio}  <button onClick={()=>(handleQuitar(producto.idDetalleVenta))}>Quitar</button></p>
                                    </li>
                                )
                            }
                            
                        </ul>
                        <div className='pFactura1'>
                            <p className='pFactura'>Total  {total === null ? " ---- " : `${total}`} 
                            <button onClick={()=>{handleCancelar()}}>Cancelar</button> 
                            <button onClick={()=>{handleFinalizarVenta()}}>Finalizar</button>
                            
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
      )
}

export default Ventas