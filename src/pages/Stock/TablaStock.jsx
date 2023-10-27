import Axios from "axios";
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { NavPrincipal } from "../../constants/constants";
import '../../styles/stock.css';


export const TablaStock = () => {

    const [stock, setStock] = useState([])
    const [contador, setContador] = useState();
    const [MostrarEditar, setMostrarEditar] = useState(false);
    const [productoActual, setProductoActual] = useState(false);
    const [aux, setAux] = useState()








    const handleEliminar = (idStock) => {
        setAux(idStock)
        const url = "http://localhost:8000/stock/eliminar/"
        console.log(idStock)
        Axios.delete(url + aux).then(() => {
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

   




    function handleCancelar() {
        setMostrarEditar(false);
    }

    function handleGuardar(stock) {
        const url = `http://localhost:8000/stock/editar/${stock.idStock}`;
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
            <NavPrincipal />

            <div className="fondo row col-11 glass">

                {
                    MostrarEditar ?

                        <Table striped bordered hover variant="warning" className='tablaeditar'>
                            <thead className=''>
                                <tr className=''>

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
                                                className='' key={stock.idStock + "edit"}>

                                              
                                                <td>{stock.nombre}
                                                </td>
                                                <td>

                                                    <input onChange={(e) => setContador(e.target.value)} value={contador} type="number" />

                                                </td><td><Button variant="danger" onClick={(() => { handleGuardar(stock) })}>Guardar</Button>{' '}</td>
                                                <td><Button variant="danger" onClick={(() => { handleCancelar(stock.codStock) })}>Cancelar</Button>{' '}</td>
                                            </tr>)
                                    }
                                    )
                                }
                            </tbody>
                        </Table> : null
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

                                        </td><td><Button variant="danger" onClick={(() => {
                                            setMostrarEditar(true)
                                            setProductoActual(stock.idStock)
                                            setContador(stock.cantidad)
                                        })}>Editar</Button>{' '}</td>
                                        <td><Button variant="danger" onClick={(() => { handleEliminar(stock.idStock) })}>Eliminar</Button>{' '}</td>
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