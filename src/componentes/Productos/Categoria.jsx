import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CATEGORIA_GET, CATEGORIA_POST } from '../../constants/constants';
import '../../styles/producto.css';

export  function Categoria() {
    
  const [categoriasArray, setCategoriasArray] = useState([]);

  const [categoria, setCategoria] = useState([]);

  const [mostrarAgregarCat, setMostrarAgregarCat] = useState(true);

    const getCategorias = () => {
        axios.get(CATEGORIA_GET).then((resp) => {
          setCategoriasArray(resp.data);
        });
      };

    const handleGuardarCategoria = () =>{
      if(categoria.length > 0){
        axios.post(CATEGORIA_POST,{
          nombre: categoria
        }).then((resp)=>{
          getCategorias()
          setMostrarAgregarCat(!mostrarAgregarCat)
          setCategoria("")
        })
      }else{
        alert("Ingrese una categoria")
      }
    }

      useEffect(() => {
        getCategorias();
      }, []);
    
  return (
    <div className='col-lg-12 glass2 productos'>

        <nav className='divLados'>
            
            <h3>Categorias</h3>
            <ul>
              {categoriasArray.length > 0 ? (
                <div >
                  {categoriasArray.map((categoria, index) => (
                    <li  key={index}>
                      <button>{categoria.nombre}</button>
                    </li>
                  ))}
                </div>
              ) : (
                <p>No hay productos...</p>
              )}
            </ul >
            <div className='btnEnd'>
              {
                mostrarAgregarCat ? (
                  <p className=''>
                     <br />
                    <button onClick={()=>setMostrarAgregarCat(!mostrarAgregarCat)} >Agregar</button>
                  </p>
                ):
                <p className=''>
                  <input type="text" onChange={(e) => setCategoria(e.target.value)} placeholder="Nuevo Categoria" className='btnEnd'/> <br />
                        <button onClick={()=>{setMostrarAgregarCat(!mostrarAgregarCat), setCategoria("")}}>Cancelar</button> <button onClick={handleGuardarCategoria}>Guardar</button>
                </p>
              }

            </div>

        </nav>

    </div>
  )
}

export default Categoria