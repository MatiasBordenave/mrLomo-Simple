import { useState } from 'react'; 


import '../../styles/modal.css'
import TicketVenta from './TicketVenta';

// eslint-disable-next-line react/prop-types
export const ModalTicket = ({ dato, abrir, detalleVenta, nuevaVenta, carrito, closeModal, modalVisible }) => {

  // const { dato } = props


  return (
    <div>
      
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
          <TicketVenta dato = {dato} detalleVenta={detalleVenta} nuevaVenta={nuevaVenta}  carrito={carrito} />
            <button className='botonModal' onClick={() => closeModal()}>Regresar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalTicket;