import axios from 'axios'
import React, { useEffect, useState } from 'react'

import '../../styles/ventas.css';
import { DETALLEVENTA_DELETE, DETALLEVENTA_DELETE_ALL, DETALLEVENTA_GET_VENTA, DETALLEVENTA_POST, FACTURA_GET_NUM, Footer, NavPrincipal, PRODUCTO_GET, TOTAL_GET_SUMA, VENTA_POST } from '../../constants/constants';
import { TablaProducto, TablaUnProducto, ModalTicket } from "../../constants/constants"



export function Ventas() {



    const [productos, setProductos] = useState([])
    const [productosFiltrados, setProductosFiltrados] = useState([])

    const [productoPorVenta, setProductoPorVenta] = useState([])
    const [idProducto, setIdProducto] = useState(1)
    const [idProd, setIdProd] = useState(0)
    const [ultimoSaldo, setUltimoSaldo] = useState(0)


    const [categoria, setCategoria] = useState([])
    const [categoriasArray, setCategoriasArray] = useState([])

    const [numFactura, setNumFactrura] = useState(0)
    const [total, setTotal] = useState(0)
    //const [mostrarObservacion, setMostrarObservacion] =useState(false)

    const [mostrarComponente, setMostrarComponente] = useState(true);
    const [mostrarTodos, setMostrarTodos] = useState(true);

    /* estados para actualizar tabla venta */
    const [identificacionCliente, setIdentificacionCliente] = useState("");

    const [formaDePago, setFormaDePago] = useState("");

    const [tipoEntrega, setTipoEntrega] = useState("");

    // aca es la parte del Modal
    const [mostrarModal, setMostrarModal] = useState(false);
    const [validarVenta, setValidarVenta] = useState(false);

    const [validarTipoEntrega, setValidarTipoEntrega] = useState(false);
    const [validarIdentificacion, setValidarIdentificacion] = useState(false);
    const [validarFormaPago, setValidarFormaPago] = useState(false);
    // aca termina el modal 



    const handleAgregar = (id) => {
        setMostrarComponente(!mostrarComponente)
        setIdProducto(id)
    }
    const handleVolver = () => {
        setMostrarComponente(!mostrarComponente)
    }

    const getProductos = () => {

        axios.get(PRODUCTO_GET)
            .then((resp) => {
                setProductos(resp.data)
            })
    }

    /*const getDetalleVenta = (id) => {
        axios.get(`http://localhost:8000/detalleVenta/`+ id)
        .then((resp)=>{
            setDetalleVenta(resp.dta)
        })

    }*/
    // const getMostrarUltimoSaldo = () => {
    //     axios.get(`http://localhost:8000/caja/mostrarUltimoSaldo`)
    //     .then((resp) => {setUltimoSaldo(resp.data[0].saldo) })

    //   }

    // const getTotal = () =>{
    //     axios.get(TOTAL_GET_SUMA + numFactura)
    //     .then((resp) =>{
    //         setTotal(resp.data[0].suma)
    //     })
    // }

    const getNumFactura = () => {
        axios.get(FACTURA_GET_NUM)
            .then((resp) => {
                setNumFactrura(resp.data.length + 1)
            })
    }


    const handleQuitar = (id) => {
        axios.delete(DETALLEVENTA_DELETE + id)
            .then(() => {
                alert("Se elimino un pedido")
                getProductoPorVenta()
                getTotal()
                getNumFactura()
            })
    }

    const handleCancelar = () => {
        // acá agrego la parte para llamar al modal

        // acá termina la parte para llamar al modal

        if (productoPorVenta.length > 0) {

            axios.delete(DETALLEVENTA_DELETE_ALL + numFactura)
                .then(() => {
                    getProductoPorVenta()
                    getTotal()
                    resetItems()
                })
        } else (alert("No hay productos para realizar la venta"))
    }

    const handleValidarVenta = () => {

        if (validarFormaPago === true && validarIdentificacion === true && validarTipoEntrega === true) {
            setValidarVenta(true)
        }
    }

    const handleFinalizarVenta = () => {

        if (productoPorVenta.length > 0 && validarVenta === true) {
            const fechaActual = new Date()
            const dia = fechaActual.getDate();
            const mes = fechaActual.getMonth() + 1; // Los meses empiezan desde 0, por lo que sumamos 1
            const anio = fechaActual.getFullYear();
            const horas = fechaActual.getHours();
            const minutos = fechaActual.getMinutes();

            // Agregar ceros a la izquierda si es necesario
            const diaFormateado = dia < 10 ? `0${dia}` : dia;
            const mesFormateado = mes < 10 ? `0${mes}` : mes;
            const horasFormateadas = horas < 10 ? `0${horas}` : horas;
            const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;

            // Formatear la fecha y hora en el formato deseado
            const fechaHoraFormateada = `${anio}-${mesFormateado}-${diaFormateado} ${horasFormateadas}:${minutosFormateados}`;


            axios.post(`http://localhost:8000/caja/registrar`,
                {
                    fechaYHora: fechaHoraFormateada.toString(),
                    concepto: "Venta nro: " + numFactura,
                    ingresos: total,
                    egresos: 0,
                    saldo: ultimoSaldo + total,
                    estado: "Abierta"

                }).then((resp) => {


                    alert("se realizo la operacion")
                }
                )


            axios.post(VENTA_POST,
                {
                    montoTotal: total,
                    fechaYHora: fechaHoraFormateada,
                    formaDePago: formaDePago,
                    tipoEntrega: tipoEntrega,
                    identificacionComprador: identificacionCliente

                }).then((resp) => {
                    getNumFactura()
                    resetItems()
                    setTotal(null)
                    setMostrarModal(true)
                    alert("se realizo la venta")
                    setValidarVenta(false)
                }
                )
        } else (alert("Faltan ingresar datos"))
    }

    const getProductoPorVenta = () => {
        axios.get(DETALLEVENTA_GET_VENTA)
            .then((resp) => {
                setProductoPorVenta(resp.data)
            })
    }

    const handleAgregarCarrito = (unProductoArray, contador, descripcion, observacion) => {
        console.log(unProductoArray)

        if (contador > 0) {
            axios.post(`http://localhost:5000/carrito`, {

                cod_Producto: unProductoArray.codProducto,
                nombre: unProductoArray.nombre,
                num_Factura: numFactura,
                cantidad: contador,
                precio: unProductoArray.precio,
                descripcion: 'Preparacion: ' + descripcion + '|    Aclaracion: ' + observacion
            })
            setIdProd(idProd + 1)
            setMostrarComponente(true)
            // getTotal()
            getNumFactura()

            //// setMostrarObservacion(descripcion.join('-'))

        } else alert("Debe ingresar una cantidad")
    }

    const resetItems = () => {
        setTipoEntrega("")
        setFormaDePago("")
        setIdentificacionCliente("")
        setValidarFormaPago(false)
        setValidarIdentificacion(false)
        setValidarTipoEntrega(false)
    }

    useEffect(() => {
        getProductos()
        getNumFactura()
        // getTotal()
        getProductoPorVenta()
        handleValidarVenta()
        // getDetalleVenta()
        // getMostrarUltimoSaldo()
        // const productoFiltradosPorVenta = obtenerProductosPorVenta(numFactura); // Aquí obtienes los productos
        // setProductosFiltrados(productoFiltradosPorVenta); // Actualizas el estado con los productos obtenidos
    }, [idProd, total, mostrarTodos, validarFormaPago, validarIdentificacion, validarTipoEntrega, validarVenta, numFactura])

    console.log(productosFiltrados)



///////////////////////////////////////

    // function obtenerProductosPorVenta(numFactura) {
    //     const id_Venta = numFactura
    //     console.log(numFactura)
    //     // Filtramos los detalles de venta que tienen el id_Venta específico
    //     const detalles = productoPorVenta.filter(detalle => detalle.id_Venta === id_Venta);
        
    //     // Buscamos los productos relacionados a cada detalle de venta
    //     const productos = detalles.map(detalle => {
    //       return {
    //         ...detalle,  // Incluye los datos del detalle de venta
    //         producto: productos.find(producto => producto.codProducto === detalle.cod_Producto)  // Encuentra el producto relacionado
    //       };
    //     });
      
    //     return productos;
    //   }
      
  



    return (
        <div className='divVentas'>
            <NavPrincipal />
            <h2 className='glass2'>Ventas</h2>
            <div className='row m-auto main'>


                <main className='col-lg-8 mainVentas'>
                    <article className='col-12 glass2 productos'>
                        {mostrarComponente ? <TablaProducto productos={productos} handleAgregar={handleAgregar}
                            mostrarTodos={mostrarTodos} /> : <TablaUnProducto mostrarComponente={mostrarComponente} idProducto={idProducto}
                                handleVolver={handleVolver} handleAgregarCarrito={handleAgregarCarrito} />}

                    </article>
                </main>
                <aside className='col-lg-4'>
                    <div className='glass2 divFactura'>
                        <h5>Numero de factura {numFactura}</h5>
                        <h6>
                            Cliente <input type="text" value={identificacionCliente} onChange={(e) => { setIdentificacionCliente(e.target.value), setValidarIdentificacion(true) }} />
                        </h6>
                        <h6>
                            Forma de pago <select name="" id="" value={formaDePago} onChange={(e) => { setFormaDePago(e.target.value), setValidarFormaPago(true) }}>
                                <option value=""></option>
                                <option value="Transferencia">Transferencia</option>
                                <option value="Efectivo">Efectivo</option>
                            </select>
                        </h6>
                        <h6>
                            Forma de entrega <select name="" id="" value={tipoEntrega} onChange={(e) => { setTipoEntrega(e.target.value), setValidarTipoEntrega(true) }}>
                                <option value=""></option>
                                <option value="Comer AQUI">Comer AQUI</option>
                                <option value="Para llevar<">Para llevar</option>
                                <option value="PY / RAPPI">PY / RAPPI</option>
                            </select>
                        </h6>


                        <ul className='ulDeslizable2'>
                            {
                                productosFiltrados.map((producto) => {
                                    if (producto.id_Venta === numFactura) {
                                        return (
                                            <li className='border-1' key={producto.idDetalleVenta}>
                                                <p>
                                                    {producto.cantidad} -- {producto.nombre} -- {producto.precio} --
                                                    {producto.stockeable === "NO" && (
                                                        <span>{producto.observacion}</span> 
                                                    )}
                                                </p>
                                                <button onClick={() => handleQuitar(producto.idDetalleVenta)}>Quitar</button>
                                            </li>
                                        );
                                    } else {
                                        return null; 
                                    }
                                })
                            }



                        </ul>
                        <div className='pFactura1'>
                            <p className='pFactura'>Total  {total === null ? " ----     " : `${total}      `}
                                <button onClick={() => { handleCancelar() }}>Cancelar</button>
                                <button onClick={() => { handleFinalizarVenta() }}>Finalizar</button>

                            </p>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Esta es la parte del modal */}
            {mostrarModal && <ModalTicket dato={numFactura} abrir={true} />}
            <Footer />
        </div>
    )
}

export default Ventas