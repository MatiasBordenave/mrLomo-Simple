import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import '../../styles/producto.css';
import Table from 'react-bootstrap/Table';
import { Footer } from "../../constants/constants";
import { PRODUCTO_POST, PRODUCTO_GET } from "../../constants/constants";
import NavPrincipal from "../../componentes/NavPrincipal/NavPrincipal";
import { Alert } from "react-bootstrap";


const productosData = [
  {
    "id": 1,
    "nombre": "Hamburguesa Clásica",
    "descripcion": "Pan artesanal, carne de res, lechuga, tomate, queso y mayonesa.",
    "precio": 1200,
    "categoria": "Comida",
    "stockeable": false,
    "stock": 20
  },
  {
    "id": 2,
    "nombre": "Milanesa Completa",
    "descripcion": "Pan francés, milanesa de pollo, queso, tomate y lechuga.",
    "precio": 1300,
    "categoria": "Comida",
    "stockeable": false,
    "stock": 15
  },
  {
    "id": 3,
    "nombre": "Gaseosa 500ml",
    "descripcion": "Botella de gaseosa de 500ml, varios sabores disponibles.",
    "precio": 600,
    "categoria": "Bebida",
    "stockeable": true,
    "stock": 50
  },
  {
    "id": 4,
    "nombre": "Cerveza Artesanal 330ml",
    "descripcion": "Cerveza artesanal rubia o negra, en botella de 330ml.",
    "precio": 900,
    "categoria": "Bebida",
    "stockeable": false,
    "stock": 30
  },
  {
    "id": 5,
    "nombre": "Papas Fritas",
    "descripcion": "Porción mediana de papas fritas crocantes.",
    "precio": 700,
    "categoria": "Acompañamiento",
    "stockeable": false,
    "stock": 25
  },
  {
    "id": 6,
    "nombre": "Hamburguesa Vegana",
    "descripcion": "Pan integral, medallón de lentejas, palta, rúcula y tomate.",
    "precio": 1400,
    "categoria": "Comida",
    "stockeable": false,
    "stock": 10
  },
  {
    "id": 7,
    "nombre": "Agua Mineral 500ml",
    "descripcion": "Botella de agua mineral natural o con gas.",
    "precio": 500,
    "categoria": "Bebida",
    "stockeable": true,
    "stock": 40
  },
  {
    "id": 8,
    "nombre": "Sándwich de Lomito",
    "descripcion": "Pan francés, lomito, queso, tomate, lechuga y huevo.",
    "precio": 1500,
    "categoria": "Comida",
    "stockeable": false,
    "stock": 12
  }
]


export function Producto() {

  const [productos, setProductos] = useState(productosData);

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
    
        setProductos(productos)
      

  }

  const deleteProducto = (id) => {
    
    setProductos(productos => productos.filter(productos => productos.id !== id));

  }

  const handleGuardarProd = () => {
    // Validar campos obligatorios
    if (!productoNuevo || !descripcion || precio <= 0 || isNaN(codigo) || codigo <= 0) {
      alert("Por favor completa todos los campos correctamente.");
      return;
    }
  
    // Validar stock si es stockeable
    if (stockeable === "SI" && (isNaN(stock) || stock < 0)) {
      alert("Por favor ingresa un stock válido.");
      return;
    }
  
    // Crear el nuevo producto
    const nuevoProducto = {
      id: codigo,
      nombre: productoNuevo,
      descripcion: descripcion,
      precio: parseFloat(precio.toFixed(2)), // Formato adecuado para precio
      stock: stockeable === "SI" ? stock : 0,
      stockeable: stockeable,
    };
  
    // Actualizar la lista de productos
    setProductos([...productos, nuevoProducto]);
    setMostrarAgregarProd(!mostrarAgregarProd);
    resetItems();
  };
  

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
    
          setUnProducto(productos.filter(productos => productos.id === idProducto));
        }
  }


  function handleCancelarEditar() {
    setMostrarEditar(false);
  }

  function handleGuardarEditar() {
    // Validaciones de los campos obligatorios
    if (!nombre.trim() || !descripcion1.trim() || isNaN(precio) || precio <= 0) {
      alert("Por favor completa todos los campos correctamente.");
      return;
    }
  
    // Validación del campo stockeable
    if (stockeableEdit === "default") {
      alert("Por favor selecciona si el producto es stockeable o no.");
      return;
    }
  
    // Validación de stock en caso de productos stockeables
    if (stockeableEdit === "SI" && (isNaN(contador) || contador < 0)) {
      alert("Por favor ingresa un stock válido.");
      return;
    }
  
    // Crear el objeto con los datos editados
    const updatedProduct = {
      id: idProducto,
      nombre: nombre.trim(),
      descripcion: descripcion1.trim(),
      precio: parseFloat(precio),
      stock: stockeableEdit === "SI" ? parseInt(contador, 10) : 0,
      stockeable: stockeableEdit,
    };
  
    // Actualizar el producto en el estado
    setProductos((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === idProducto ? updatedProduct : producto
      )
    );
  

    setMostrarEditar(false);
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
                            <td>{idProducto}</td>
                            <td><input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} /></td>
                            <td><input value={descripcion1} onChange={(e) => setDescripcion1(e.target.value)} type="text" /></td>
                            <td><input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} /></td>
                            <td>
                              <select
                                name=""
                                id=""
                                value={stockeableEdit} // Mantener el estado sincronizado
                                onChange={(e) => {
                                  setStockeableEdit(e.target.value);
                                  setValidacionStockeable1(e.target.value === "SI" || e.target.value === "NO");
                                }}
                              >
                                <option value="default">Seleccionar</option>
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
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        productos.map((producto) => {
                          return (
                            <tr
                              className='' key={producto.id} >

                              <td >{producto.id}</td>
                              <td>{producto.nombre}</td>
                              <td>{producto.descripcion}</td>
                              <td>{producto.precio}</td>
                              <td>{producto.stock}</td>




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
                <p>Codigo: 
                  <input 
                    type="number" 
                    autoFocus 
                    placeholder="Codigo" 
                    onChange={(e) => setCodigo(parseInt(e.target.value, 10) || "")} // Eliminar ceros iniciales
                  />
                </p>
                <p>Nombre: 
                  <input 
                    type="text" 
                    placeholder="Producto Nuevo" 
                    onChange={(e) => setProductoNuevo(e.target.value.trim())} // Quitar espacios innecesarios
                  />
                </p>
                <p>Descripcion: 
                  <input 
                    type="text" 
                    placeholder="Descripcion" 
                    onChange={(e) => setDescripcion(e.target.value.trim())}
                  />
                </p>
                <p>Precio: 
                  <input 
                    type="number" 
                    placeholder="Precio" 
                    onChange={(e) => setPrecio(parseFloat(e.target.value) || 0)} // Convertir a número válido
                  />
                </p>
              
                <p>Stock Activo:
                  <select 
                    name="" 
                    id="" 
                    onChange={(e) => { 
                      setStockeable(e.target.value); 
                      if (e.target.value === "NO") setStock(0); // Si no es stockeable, stock = 0
                    }}
                  >
                    <option value="default">Seleccionar</option>
                    <option value="SI">SI</option>
                    <option value="NO">NO</option>
                  </select>
                </p>
              
                {stockeable === "SI" && (
                  <p>Stock: 
                    <input 
                      type="number" 
                      placeholder="Stock" 
                      defaultValue={0} 
                      onChange={(e) => setStock(parseInt(e.target.value, 10) || 0)} // Eliminar ceros iniciales
                    />
                  </p>
                )}
              
                <button onClick={handleGuardarProd}>Guardar</button>
                <button 
                  onClick={() => { 
                    setMostrarAgregarProd(!mostrarAgregarProd); 
                    resetItems(); 
                  }}
                >
                  Cancelar
                </button>
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