import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import '../../styles/producto.css';
import Table from 'react-bootstrap/Table';
import { Footer } from "../../constants/constants";
import { PRODUCTO_POST, PRODUCTO_GET } from "../../constants/constants";
import NavPrincipal from "../../componentes/NavPrincipal/NavPrincipal";
import { Alert } from "react-bootstrap";


export function Producto() {

  const [productos, setProductos] = useState([]);

  //producto nuevo
  const [codigo, setCodigo] = useState();
  const [productoNuevo, setProductoNuevo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState();
  const [stock, setStock] = useState(0);
  const [categoria, setCategoria] = useState([]);


  const [categorias, setCategorias] = useState([]);
  const [mostrarAgregarProd, setMostrarAgregarProd] = useState(true)

  /*editaR*/
  const [contador, setContador] = useState();
  const [idProducto, setIdProducto] = useState(0);
  const [unProducto, setUnProducto] = useState([]);
  const [MostrarEditar, setMostrarEditar] = useState(false);
  const [productoActual, setProductoActual] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion1, setDescripcion1] = useState("");
  const [codigoProd, setCodigoProd] = useState("");
  const [categoria1, setCategoria1] = useState("");
  const [stockeable, setStockeable] = useState("");
  const [stockeableEdit, setStockeableEdit] = useState("");
  const [validacionStockeable, setValidacionStockeable] = useState(false);
  const [validacionStockeable1, setValidacionStockeable1] = useState(false);
  const [validacionCategoria, setValidacionCategoria] = useState(false);


  const [select, setSelect] = useState();



  const getProductos = () => {
    axios.get(PRODUCTO_GET)
      .then((resp) => {
        setProductos(resp.data)
      })

  }

  const deleteProducto = (id) => {
    axios.delete(`https://fake-api-sangucheria.vercel.app/productos/` + id)
      .then((resp) => {
        getProductos();
      })

  }
  const handleGuardarProd = () => {
    console.log(productoNuevo, ", ", descripcion, ", ", precio, ", ")

    if (productoNuevo.length > 0 && descripcion.length > 0 && precio > 0) {
      axios.post(PRODUCTO_POST, {
        codProducto: codigo,
        nombre: productoNuevo,
        descripcion: descripcion,
        precio: precio,
        stock: stock,
        stockeable: stockeable
      }).then((resp) => {
        setMostrarAgregarProd(!mostrarAgregarProd)
        alert("Se agrego un Producto")
        getProductos()
        resetItems()
      })
    } else {
      alert("Ingrese los datos del producto")
    }
  }

  const onClickNuevo = () => {
    setMostrarAgregarProd(!mostrarAgregarProd)
  }


  const resetItems = () => {
    setCodigo(0)
    setProductoNuevo("")
    setDescripcion("")
    setPrecio(0)
    setStock(0)
    setStockeable("")
    setStockeableEdit("")
    setValidacionStockeable1(false)
  }



  const mostrarUnProducto = () => {

     console.log(idProducto)
    if (idProducto.length > 0) {
      axios.get(`https://fake-api-sangucheria.vercel.app/productos/` + idProducto)
        .then((resp) => {
          setUnProducto(resp.data)
        })

    }
  }


  function handleCancelarEditar() {
    setMostrarEditar(false);
  }

  function handleGuardarEditar() {
    const url = `https://fake-api-sangucheria.vercel.app/productos/` + idProducto;
    let newObj = {
      nombre: nombre,
      descripcion: descripcion1,
      precio: precio,
      stock: contador,
      stockeable: stockeableEdit
    }

    if (nombre.length > 0 && descripcion1.length > 0 && precio > 0 && validacionStockeable1 == true) {

      axios.patch(url, newObj).then((data) => {
        alert("Se ha realizado la ACTUALIZACION")
        getProductos();
        setMostrarEditar(false);
      })
    }
    else {
      alert("Ingrese los datos faltantes")
    }
  }


  useEffect(() => {
    getProductos();
    mostrarUnProducto();
  }, [idProducto, validacionStockeable1], [idProducto], [stockeable]);


  return (


    <div className="divProductos">
      <NavPrincipal />
      <div className="row m-auto col-12 main">
        <h2 className="glass2">Lista de Productos</h2>


        <aside className="col-md-12">
          <div className="glass2 productos ">

            {
              MostrarEditar ? (<div>

                <h1>Editar Producto</h1>
                <Table striped bordered hover variant="warning" className='md tabla'>
                  <thead className=''>
                    <tr className=''>
                      <th>Codigo</th>
                      <th>Nombre</th>
                      <th>Descripcion</th>
                      <th>Precio</th>
                      <th>Stockeable</th>
                      {
                        stockeableEdit == "SI" &&
                        <th>Stock</th>
                      }

                      <th>Guardar</th>
                      <th>Cancelar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      
                         (
                          <tr>
                            <td>{codigoProd}</td>
                            <td><input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} /></td>
                            <td><input value={descripcion1} onChange={(e) => setDescripcion1(e.target.value)} type="text" /></td>
                            <td><input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} /></td>
                            <td>
                              <select name="" id="" onChange={(e) => { setStockeableEdit(e.target.value), setValidacionStockeable1(true) }}>
                                <option value="NO"></option>
                                <option value="SI">SI</option>
                                <option value="NO">NO</option>
                              </select>
                            </td>
                            {
                              stockeableEdit == "SI" &&
                              <td> <input onChange={(e) => setContador(e.target.value)} value={contador} type="number" /></td>
                            }

                            <td><button onClick={(() => { handleGuardarEditar() })}>Guardar</button>{' '}</td>
                            <td><button onClick={(() => { handleCancelarEditar() })}>Cancelar</button>{' '}</td>


                          </tr>)
                      }
                      
                    
                  </tbody>
                </Table>
              </div>
              ) 
              : 

              mostrarAgregarProd 

              ? 

              // productos 

              (
                <div className="divLados">
                  <h3>Productos</h3>

                  <Table striped bordered hover variant="warning" className='tabla'>
                    <thead className=''>
                      <tr className=''>


                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Stockeable</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        productos.map((producto) => {
                          return (
                            <tr
                              className='' key={producto.codProducto} >

                              <td >{producto.codProducto}</td>
                              <td>{producto.nombre}</td>
                              <td>{producto.descripcion}</td>
                              <td>{producto.precio}</td>
                              <td>{producto.stock}</td>
                              <td>{producto.stockeable}</td>




                              <td><button onClick={(() => {
                                setMostrarEditar(true)
                                setProductoActual(false)
                                setIdProducto(producto.id)
                                setCodigoProd(producto.codProducto)
                                setContador(producto.stock)
                                setDescripcion1(producto.descripcion)
                                setNombre(producto.nombre)
                                setSelect(producto.codProducto)
                                setPrecio(producto.precio)
                                mostrarUnProducto(producto.codProducto)

                              })}>Editar</button>{' '}</td>




                              <td><button onClick={(() => { deleteProducto(producto.id) }
                              )}>Eliminar</button>{' '}</td>
                            </tr>)
                        })
                      }
                    </tbody>
                  </Table>


                  <div className="btnEnd">
                    <button onClick={onClickNuevo}>Nuevo</button>
                  </div>
                </div>
              ) 
              
              : 
              // producto nuevo
              (
                <div>
                  <h3>Producto Nuevo</h3>
                  <p>Codigo: <input type="number" autoFocus placeholder="Codigo" onChange={(e) => setCodigo(e.target.value)} /></p>
                  <p>Nombre: <input type="text" placeholder="Producto Nuevo" onChange={(e) => setProductoNuevo(e.target.value)} /></p>
                  <p>Descripcion: <input type="text" placeholder="Descripcion" onChange={(e) => setDescripcion(e.target.value)} /></p>
                  <p>Precio: <input type="number" placeholder="Precio" onChange={(e) => setPrecio(e.target.value)} /></p>


                  <p>Stock Activo:
                    <select name="" id="" onChange={(e) => { setStockeable(e.target.value) }}>
                      <option value="NO"></option>
                      <option value="SI">SI</option>
                      <option value="NO" onClick={() => setStock(0)}>NO</option>
                    </select>
                  </p>
                  {
                    stockeable == "SI" &&
                    <p>Stock: <input type="number" placeholder="Stock" defaultValue={0} onChange={(e) => setStock(e.target.value)} /></p>
                  }



                  <button onClick={handleGuardarProd}>Guardar</button>

                  <button onClick={() => { setMostrarAgregarProd(!mostrarAgregarProd), resetItems() }}>Cancelar</button>
                </div>
              )

            }
          </div>
        </aside>

      </div>
      <Footer />
    </div>
  );
}

export default Producto