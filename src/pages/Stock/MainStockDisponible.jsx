import { useState} from "react"
import Axios from "axios"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from "../../assets/mrLomo.png"
import { NavPrincipal } from "../../constants/constants";
import '../../styles/stock.css';


export const MainStockDisponible = () => {


  const [idIngrediente, setIdIngrediente] = useState(0)
  const [cantidad, setCantidad] = useState();

  const handleAgregar = () => {
    Axios.post("http://localhost:8000/stock/registrar", {
      cantidad: cantidad,
      id_Ingrediente: idIngrediente
    }).then(() => {
      alert ("Se agrego correctamente")
    })
  }



  return (

    <div className="fondo">
      <NavPrincipal/>
      <img src={logo} alt="" />

      <div style={{
        display: 'block',
        width: 600,
        fontSize: 17,
        color: "white",
        textAlign: "center",
        margin: "auto",
        padding: 10,
      }}>
        <h1>Control de Stock</h1>
        <Form>
          <Form.Group>
            <Form.Label>Cantidad:</Form.Label>
            <Form.Control type="number" placeholder="cantidad" onChange={(e)=>setCantidad(e.target.value)}/>
          </Form.Group> <br />
          <Form.Group>
            <Form.Label>id_Ingrediente:</Form.Label>
            <Form.Control type="text" placeholder="Nombre" onChange={(e)=>setIdIngrediente(e.target.value)}/>
          </Form.Group>
          <br />
          <Button onClick={handleAgregar} variant="primary" type="submit">
           Ingresar stock
          </Button>
        </Form>
      </div>



    </div>
  )
}

export default MainStockDisponible