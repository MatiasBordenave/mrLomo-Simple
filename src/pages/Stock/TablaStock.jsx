import Axios from "axios";
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { Footer, NavPrincipal } from "../../constants/constants";
import '../../styles/stock.css';

import { STOCK_GET } from "../../constants/constants";


export const TablaStock = () => {

    const [stock, setStock] = useState([])
    const [contador, setContador] = useState();
    const [idProducto, setIdProducto] = useState(0);
    const [unProducto, setUnProducto] = useState([]);
    const [MostrarEditar, setMostrarEditar] = useState(false);
    const [productoActual, setProductoActual] = useState(false);
    const [aux, setAux] = useState()








    const handleEliminar = (id) => {
        const url = "http://localhost:8000/stock/eliminar/"
        Axios.delete(url + id).then(() => {
            mostrarstock()
            alert("borrado")
        })


    }


    const mostrarstock = () => {
        Axios.get(STOCK_GET).then((response) => {
            setStock(response.data)
        })
        console.log(stock)
    }
    const mostrarUnProducto = () =>{
        if(idProducto > 0){
            Axios.get(`http://localhost:8000/stock/${idProducto}`)
            .then((resp)=>{
                setUnProducto(resp.data)
            })
        }
    }


    useEffect(() => {
        mostrarstock();
        mostrarUnProducto();
    }, [idProducto])

   




    function handleCancelar() {
        setMostrarEditar(false);
    }

    function handleGuardar(stock) {
        const url = `http://localhost:8000/stock/editar/${stock.codProducto}`;
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

            <div className="divStock fondo row col-11 glass">

                {
                    MostrarEditar ?

                        <Table striped bordered hover variant="warning" className='tablaeditar'>
                            <thead className=''>
                                <tr className=''>
                                    <th>Codigo</th>
                                    <th>Nombre</th>
                                    <th>Cantidad</th>
                                    <th>Guardar</th>
                                    <th>Cancelar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productoActual && unProducto.map((stock) => {

                                        return (
                                            <tr
                                                className='' key={stock.idStock + "edit"}>

                                              <td>{stock.codProducto}</td>
                                                <td>{stock.nombre}
                                                </td>
                                                <td>

                                                    <input onChange={(e) => setContador(e.target.value)} value={contador} type="number" />

                                                </td>
                                                <td><button  onClick={(() => { handleGuardar(stock) })}>Guardar</button>{' '}</td>
                                                <td><button  onClick={(() => { handleCancelar(stock.codStock) })}>Cancelar</button>{' '}</td>
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


                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stock.map((stock) => {
                                return (
                                    <tr
                                        className='' key={stock.codProducto}>


                                            <td>{stock.codProducto}</td>
                                        <td>{stock.nombre}</td>
                                        <td>
                                            {stock.stock}

                                        </td><td><button onClick={(() => {
                                            setMostrarEditar(true)
                                            setIdProducto(stock.codProducto)
                                            setContador(stock.stock)
                                            setProductoActual(true)
                                            mostrarUnProducto()
                                        })}>Editar</button>{' '}</td>
                                    </tr>)
                            })
                        }
                    </tbody>
                </Table>
                    

            </div>
        <Footer/>

        </>
    )
}

export default TablaStock