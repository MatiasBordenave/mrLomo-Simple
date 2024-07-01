import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import '../../styles/producto.css';
import Table from 'react-bootstrap/Table';
import { Categoria, Footer } from "../../constants/constants";
import { CATEGORIA_GET, PRODUCTO_POST, PRODUCTO_GET} from "../../constants/constants";
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
  const [categoria1, setCategoria1] = useState("");
  const [stockeable, setStockeable] = useState("");
  const [stockeableEdit, setStockeableEdit] = useState("");
  const [validacionStockeable, setValidacionStockeable] = useState(false);
  const [validacionStockeable1, setValidacionStockeable1] = useState(false);
  const [validacionCategoria, setValidacionCategoria] = useState(false);
 // const [codProducto, setCodProducto] = useState("");



 /* const [mostrarUnaCat, setMostrarUnaCat] = useState([])*/
const [select, setSelect] = useState();
//const [nombreCat, setNombreCat] = useState("")

 
  const getCategorias = () => {
    axios.get(CATEGORIA_GET)
    .then((resp)=>{
        setCategorias(resp.data)
    }) 
}

/*const getCategoriaSola = (id) => {
  axios.get(`http://localhost:8000/categoria/categoria/`+ id)
  .then((resp)=>{
      setNombreCat(resp.data)
  }) 
}*/

//console.log(nombreCat)

const getProductos = () =>{
  axios.get(PRODUCTO_GET)
  .then((resp)=>{
      setProductos(resp.data)
  }) 
  
}

const deleteProducto = (id) =>{
  axios.delete(`http://localhost:8000/productos/borrar/` + id)
  .then((resp)=>{
     getProductos();
  }) 
  
}
  const handleGuardarProd = () =>{
    // setValidacionStockeable(false)
    // if(stockeable== "SI" || stockeable == "NO")
    // {setValidacionStockeable(true)}
    if( productoNuevo.length > 0 && descripcion.length > 0 && precio > 0 && categoria > 0 ){
      axios.post(PRODUCTO_POST,{
        codProducto: codigo,
        nombre: productoNuevo,
        descripcion: descripcion,
        precio: precio,
        id_Categoria: categoria,
        stock: stock,
        stockeable : stockeable
      }).then((resp)=>{
        setMostrarAgregarProd(!mostrarAgregarProd)
        alert("Se agrego un Producto")
        getProductos()
        resetItems()
      })
    }else{        
      alert("Ingrese los datos del producto")
    } 
  }

  const onClickNuevo = ()=> {
    getCategorias()
    setMostrarAgregarProd(!mostrarAgregarProd)
  }


  const resetItems = () =>{
    setCodigo(0)
    setProductoNuevo("")
    setDescripcion("")
    setPrecio(0)
    setCategoria(0)
    setStock(0)
    setStockeable("")
    setStockeableEdit("")
    setValidacionStockeable1(false)
  }



  const mostrarUnProducto = () =>{

   // console.log(idProducto)
    if(idProducto > 0){
        axios.get(`http://localhost:8000/productos/` + idProducto)
        .then((resp)=>{
            setUnProducto(resp.data)
        })

    }

    


}

function handleCancelarEditar() {
  setMostrarEditar(false);
}

function handleGuardarEditar() {
  const url = `http://localhost:8000/productos/editar/` + idProducto;
  let newObj = {
    codProducto : idProducto,
    nombre: nombre,
    descripcion: descripcion1,
    precio: precio,
    id_Categoria: categoria1,
    stock: contador,
    stockeable: stockeableEdit
  }
  
  if( nombre.length > 0 && descripcion1.length > 0 && precio > 0 && categoria1 > 0 && validacionStockeable1 == true){
    
    axios.put(url, newObj).then((data) => {
      alert("Se ha realizado la ACTUALIZACION")
      getProductos();
      setMostrarEditar(false);
    })
    }
    else{
      alert("Ingrese los datos faltantes")
    }
}


useEffect(() => {
  getProductos();
  getCategorias();
  mostrarUnProducto();
}, [idProducto, validacionStockeable1], [idProducto], [stockeable]);

  
  //console.log(unProducto)
  //console.log(select)
  //console.log(nombreCat)
  
  return (
   
   
   <div className="divProductos">
        <NavPrincipal />
      <div className="row m-auto col-12 main">
        <h2 className="glass2">Lista de Productos</h2>
        <div className="col-md-3">
          <Categoria/>
        </div>


          <aside className="col-md-9">
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
                                  <th>Categoria</th>
                                          <th>Guardar</th>
                                          <th>Cancelar</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {
                                        productoActual && unProducto.map((stock) => {
                                          
                                          return (
                                            <tr
                                            className='' key={stock.codProducto}>
                                                    <td>{stock.codProducto}</td>
                                                    <td><input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre}/></td>
                                                    <td><input  value={descripcion1} onChange={(e) => setDescripcion1(e.target.value)}  type="text" /></td>
                                                    <td><input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)}/></td>
                                                    <td>
                                                    <select name="" id=""  onChange={(e)=>{setStockeableEdit(e.target.value), setValidacionStockeable1(true)}}>
                                                      <option value="NO"></option>
                                                      <option value="SI">SI</option> 
                                                      <option value="NO">NO</option>
                                                      </select>
                                                    </td>
                                                    {
                                                      stockeableEdit == "SI" && 
                                                        <td> <input onChange={(e) => setContador(e.target.value)} value={contador} type="number" /></td>
                                                    }
                                                 
                                                    <td>
                                                      <select onChange={(e) => setCategoria1(e.target.value)}>
                                                        <option value={select}></option>
                                                        {categorias.map((categoria) => (
                                                          <option key={categoria.idCategoria} value={categoria.idCategoria}>
                                                            {categoria.nombre}
                                                          </option>
                                                        ))}
                                                      </select>
                                                    </td>
                                                    <td><button  onClick={(() => { handleGuardarEditar(stock) })}>Guardar</button>{' '}</td>
                                                    <td><button  onClick={(() => { handleCancelarEditar(stock.codStock) })}>Cancelar</button>{' '}</td>
                                                     
                                              
                                                  </tr>)
                                          }
                                          )
                                        }
                                  </tbody>
                              </Table>
                                        </div>
                              ) :(null)
                      }
              
              
              {
                mostrarAgregarProd ? (
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
                            <th>Categoria</th>
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
                                        <td>{producto.categoria}</td>
                                        
                                        
                                        
                                        <td><button onClick={(() => {
                                            setMostrarEditar(true)
                                            setProductoActual(true)
                                            setIdProducto(producto.codProducto)
                                            setContador(producto.stock)
                                            setDescripcion1(producto.descripcion)
                                            setNombre(producto.nombre)
                                            setSelect(producto.codProducto)
                                            setPrecio(producto.precio)
                                            mostrarUnProducto(producto.codProducto)
                                         //   getCategoriaSola(producto.codProducto)
                                        })}>Editar</button>{' '}</td>




                                        <td><button onClick={(() => {deleteProducto(producto.codProducto)}
                                    )}>Eliminar</button>{' '}</td>
                                    </tr>)
                            })
                        }
                    </tbody>
                </Table>

    
                      <div className="btnEnd">
                      <button  onClick={onClickNuevo}>Nuevo</button>              
                      </div>
                  </div>
                ) : (
                  <div>
                  <h3>Producto Nuevo</h3>
                    <p>Codigo: <input type="number" autoFocus placeholder="Codigo" onChange={(e)=>setCodigo(e.target.value)}/></p> 
                      <p>Nombre: <input  type="text" placeholder="Producto Nuevo" onChange={(e)=>setProductoNuevo(e.target.value)}/></p> 
                      <p>Descripcion: <input type="text" placeholder="Descripcion" onChange={(e)=> setDescripcion(e.target.value)} /></p>
                      <p>Precio: <input type="number"  placeholder="Precio" onChange={(e)=> setPrecio(e.target.value)}/></p>
                      <select required onChange={(e)=>setCategoria(e.target.value)}>
                        <option  value="1"></option>
                        {categorias.map((categoria)=>(
                        <option  key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.nombre}</option>
                        ))}
                      </select>
                      <tr></tr>
                      <p>Stock Activo: 
                        <select name="" id=""  onChange={(e)=>{setStockeable(e.target.value)}}>
                        <option value="NO"></option>
                        <option value="SI">SI</option> 
                        <option value="NO" onClick={()=> setStock(0)}>NO</option>
                        </select>
                      </p>
                      {
                        stockeable == "SI" && 
                        <p>Stock: <input type="number" placeholder="Stock" defaultValue={0} onChange={(e)=> setStock(e.target.value)}/></p>
                      }


                      
                      <button onClick={handleGuardarProd}>Guardar</button>

                      <button onClick={()=>{setMostrarAgregarProd(!mostrarAgregarProd), resetItems()}}>Cancelar</button>
                  </div>
                )

              }
            </div>
          </aside>

      </div>
      <Footer/>
    </div>
  );
}

export default Producto