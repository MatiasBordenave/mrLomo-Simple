import { useState } from 'react'; 


import '../../styles/modal.css'
import TicketVenta from './TicketVenta';

// eslint-disable-next-line react/prop-types
export const ModalTicket = ({ dato, abrir }) => {
  const [modalVisible, setModalVisible] = useState(true);
  // const { dato } = props
  const closeModal = () => {
    setModalVisible(false);
  };
console.log(dato)

  return (
    <div>
      
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
          <TicketVenta dato = {dato}/>
            <button className='botonModal' onClick={closeModal}>Regresar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalTicket;