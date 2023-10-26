import Axios from "axios";
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { useParams } from 'react-router-dom'
import { NavPrincipal } from "../../constants/constants";
import '../../styles/stock.css';


export const TablaStock = () => {

    const [stock, setStock] = useState([])
    const [ setCodproducto] = useState()
   
    const [,setNombre] = useState("");
    const [, setCantidad] = useState();
    const [contador, setContador] = useState();
    const [MostrarEditar, setMostrarEditar] = useState(false);
    const [productoActual, setProductoActual] = useState(false);
  







    const handleEliminar = (codstock) => {
        const url = "http://localhost:8000/stock/eliminar/"
        console.log(codstock)
        Axios.delete(url + codstock).then(() => {
            mostrarstock()
            alert("borrado")
        })


    }

    const mostrarstock = () => {
        Axios.get("http://localhost:8000/stock").then((response) => {
            setStock(response.data)
        })
    }

    useEffect(() => {
        mostrarstock();
    }, [])

    let { codStock } = useParams()

    const getstock = () => {
        const url = "http://localhost:8000/stock/"
        Axios.get(url + codStock).then((response) => {
            setCodproducto(response.data[0].Codproducto)
            setNombre(response.data[0].tipo)
            setCantidad(response.data[0].cantidad)
        })
    }


    useEffect(() => {
        getstock()
    }, [])




    function handleCancelar(){
        setMostrarEditar(false);
    }

    function handleGuardar(stock){
        const url = `http://localhost:8000/stock/editar/${stock.codStock}`;
        let newObj = {
            ...stock, cantidad: contador
        }
        Axios.put(url, newObj).then((data) => {
            mostrarstock();
            setMostrarEditar(false);
        })
    }


    return (
        <>
        <NavPrincipal/>

            <div className="fondo">

                {
                    MostrarEditar ?

                        <Table striped bordered hover variant="warning" className='tabla'>
                            <thead className=''>
                                <tr className=''>

                                    <th>Codigo de producto</th>
                                    <th>Nombre</th>
                                    <th>Cantidad</th>
                                    <th>Guardar</th>
                                    <th>Cancelar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productoActual && stock.map((stock) => {
                                       
                                        return (
                                            <tr
                                                className='' key={stock.codStock + "edit"}>

                                                <td>{stock.cod_Producto}</td>
                                                <td>{stock.nombre}
                                                </td>
                                                <td>

                                                    <input onChange={(e) => setContador(e.target.value)} value={contador} type="number" />

                                                </td><td><Button variant="danger" onClick={(() => { handleGuardar(stock) })}>Guardar</Button>{' '}</td>
                                                <td><Button variant="danger" onClick={(() => {  handleCancelar(stock.codStock) })}>Cancelar</Button>{' '}</td>
                                            </tr>)
                                        }
                                    )
                                }
                            </tbody>
                        </Table>:null
                }


                <Table striped bordered hover variant="warning" className='tabla'>
                    <thead className=''>
                        <tr className=''>


                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stock.map((stock) => {
                                return (
                                    <tr
                                        className='' key={stock.idIngrediente}>


                                        <td>{stock.nombre}</td>
                                        <td>
                                            {stock.cantidad}

                                        </td><td><Button variant="danger" onClick={(() => { setMostrarEditar(true)
                                        setProductoActual(stock.cod_Producto)
                                             setContador(stock.cantidad) })}>Editar</Button>{' '}</td>
                                        <td><Button variant="danger" onClick={(() => { handleEliminar(stock.codStock) })}>Eliminar</Button>{' '}</td>
                                    </tr>)
                            })
                        }
                    </tbody>
                </Table>


            </div>

        </>
    )
}

export default TablaStock