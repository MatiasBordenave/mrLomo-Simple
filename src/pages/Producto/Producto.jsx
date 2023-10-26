import React, { useEffect, useState } from "react";
import axios from "axios";
import edit from '../../assets/edit.png'
import '../../styles/producto.css';

import { Categoria } from "../../constants/constants";

import { CATEGORIA_GET, INGREDIENTES_GET, INGREDIENTES_GET_CRUZE, INGREDIENTES_POST, Nav, PRODUCTO_POST } from "../../constants/constants";
import NavPrincipal from "../../componentes/NavPrincipal/NavPrincipal";

export function Producto() {
  const [productos, setProductos] = useState([]);
  //producto nuevo
  const [productoNuevo, setProductoNuevo] = useState();
  const [descripcion, setDescripcion] = useState();
  const [precio, setPrecio] = useState();

  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [ingredientes, setIngredientes] = useState([])
  const [nombIngredientes, setNombIngredientes] = useState([])
  const [mostrarAgregarIng, setMostrarAgregarIng] = useState(true)
  const [mostrarAgregarProd, setMostrarAgregarProd] = useState(true)



  const getProductos = () => {
    axios.get(INGREDIENTES_GET_CRUZE).then((resp) => {
      setProductos(resp.data);
    });
  };
  const getIngredientes = () =>{
    axios.get(INGREDIENTES_GET)
    .then((resp) =>{
      setIngredientes(resp.data)
    })
  }
  const getCategorias = () =>{
    axios.get(CATEGORIA_GET)
    .then((resp)=>{
        setCategorias(resp.data)
    }) 
}
  const handleGuardarProd = () =>{
    if( productoNuevo.length > 0 && descripcion.length > 0 && precio > 0 && categoria > 0){
      axios.post(PRODUCTO_POST,{
        nombre: productoNuevo,
        descripcion: descripcion,
        precio: precio,
        id_Categoria: categoria
      }).then((resp)=>{
        setMostrarAgregarProd(!mostrarAgregarProd)
        getProductos()
        alert("Se agrego un Ingrediente")
        resetItems()
      })
    }else{        
      alert("Ingrese los datos del producto")
    } 
  }

  const handleEditarIngrediente = () =>{
    
  }

  const resetItems = () =>{
    setNombIngredientes("")
    setProductoNuevo("")
    setDescripcion("")
    setPrecio(0)
    categoria(0)
  }

  const handleGuardarIngrediente = () =>{
    if( nombIngredientes.length > 0 ){
      axios.post(INGREDIENTES_POST,{
        nombre: nombIngredientes
      })
      .then((resp)=>{
        getIngredientes()
        setMostrarAgregarIng(!mostrarAgregarIng)
        resetItems()
        alert("Se agrego un Ingrediente")
      })
    }else{
      alert("Ingrese un ingrediente")
    }
  }


  useEffect(() => {
    getProductos();
    getIngredientes()
    getCategorias()
  }, [categoria]);

  return (
    <div className="divProductos">
        <NavPrincipal />
      <div className="row m-auto col-12 main">
        <h2 className="glass2">Lista de Productos</h2>
        <div className="col-3">
          <Categoria/>
        </div>

          <aside className="col-md-6">
            <div className="glass2 productos ">
              {
                mostrarAgregarProd ? (
                  <div className="divLados">
                    <h3>Productos</h3>
                    <ul>
                      {
                        productos.map((producto, index)=>{
                          return(
                            <li key={index}>
                                <p>{producto.nombreProducto}: ({producto.ingredientes})</p>
                            </li>
                          )
                        })
                      }
                    </ul> 
                    <div className="btnEnd"> <br />
                      <button  onClick={()=> setMostrarAgregarProd(!mostrarAgregarProd)}>Nuevo</button>              
                    </div>
                  </div>
                ) : (
                  <div>
                      <p>Nombre: <input type="text" placeholder="Producto Nuevo" onChange={(e)=>setProductoNuevo(e.target.value)}/></p> 
                      <p>Descripcion: <input type="text" placeholder="Descripcion" onChange={(e)=> setDescripcion(e.target.value)} /></p>
                      <p>Precio: <input type="number"  placeholder="Precio" onChange={(e)=> setPrecio(e.target.value)}/></p>
                      <select onChange={(e)=>setCategoria(e.target.value)}>
                        <option  value="1"></option>
                        {categorias.map((categoria)=>(
                        <option  key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.nombre}</option>
                        ))}
                      </select>



                      <p>Ingredientes: </p>

                      <button onClick={()=>{setMostrarAgregarProd(!mostrarAgregarProd), resetItems()}}>Cancelar</button>
                      <button onClick={handleGuardarProd}>Guardar</button>
                  </div>
                )

              }
            </div>
          </aside>
          <nav className="col-md-3 ">
          <div className="glass2 divLados">
              <h3>Ingredientes</h3>
              <ul>
                {
                  ingredientes.map(ingrediente=>{
                    return(
                    <li key={ingrediente.idIngrediente}>
                        <p>{ingrediente.nombre}    <button onClick={()=>{handleEditarIngrediente(ingrediente.idIngrediente)}} className="btnConfig"></button></p>
                    </li>
                    )
                  })
                }
              </ul>
            <div className="btnEnd">
              {
                mostrarAgregarIng ? 
                <p> <br />
                  <button onClick={()=>{setMostrarAgregarIng(!mostrarAgregarIng)}}>Agregar</button>
                </p> :
                <div className="">
                    <input type="text" onChange={(e) => setNombIngredientes(e.target.value)} placeholder="Nuevo Ingrediente"/> <br />
                    <button onClick={()=>{setMostrarAgregarIng(!mostrarAgregarIng), setNombIngredientes("")}}>Cancelar</button> <button onClick={handleGuardarIngrediente}>Guardar</button>
                </div>
              }
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Producto