import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import "../../styles/ticket.css"


export function TicketVenta({ detalleVenta, carrito }){


    // const [tickets, setTickets] = useState([])
    // const [unTicket, setUnTicket] = useState([])

    // const mostrarTickets = () => {
    //     Axios.get('http://localhost:8000/ticket')
    //     .then((response) => {
    //         setTickets(response.data)
    //     })
    // }
    // console.log(tickets)

    // const mostrarUnTicket = (Id) => {
    //     Axios.get("http://localhost:8000/ticket/" + Id)
    //         .then((response) => {
    //             setUnTicket(response.data)
    //     })
    // }

    const handleImprimir = () => {
        window.print();
    }

    console.log()

    useEffect(() => {
        // mostrarTickets();
        // mostrarUnTicket(props.dato);      
    }, [])
    
    return(
        <>     
            {carrito.length > 0 ? (
            <div className='ticket'>
                <h2 id='tituloTicket'>Ticket N° {carrito[0].idVenta}</h2>
                <table className='tablaTicket'>
                    <thead className='parteArriba'>
                        <tr>
                            <th>Cliente</th>
                            <th>Tipo de Pago</th>
                            <th>Tipo de Entrega</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody className='cuerpoArriba'>
                        <tr>
                            <td>{detalleVenta.identificacionComprador}</td>
                            <td>{detalleVenta.formaDePago}</td>
                            <td>{detalleVenta.tipoEntrega}</td>
                            <td>{detalleVenta.fechaYHora.slice(0, 10)}</td>
                        </tr>
                    </tbody>
                    
                    <thead className='parteMedio'>
                    <tr>
                        <th>Productos</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Preparado</th>
                    </tr>
                    </thead>
                    <tbody className='cuerpoMedio'>
                    {carrito.map((ticket, index) => (
                        <tr key={index}>       
                        <td>{ticket.nombre}</td>
                        <td>{ticket.cantidad}</td>
                        <td>{ticket.subTotal}</td>
                        <td>{ticket.observacion}</td>
                        </tr>
                    ))}
                    </tbody>

                    <thead className='parteBaja'>
                    <tr>
                        <th colSpan="4">Total</th>
                    </tr>
                    </thead>    
                    <tbody className='cuerpoBajo'>
                        <tr>
                            <td colSpan="4">{carrito[0].montoTotal}</td>
                        </tr>
                    </tbody>

                    
                </table>

                <button onClick={handleImprimir} className='imprimir'>Imprimir</button>
            </div>
      ) : (
        <p>No hay datos de ticket disponibles</p>
      )}
        </>
    )
}

export default TicketVenta