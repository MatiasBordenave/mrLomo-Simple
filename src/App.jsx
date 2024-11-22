import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"


import {  Producto, Ventas, ListadoVentas, VentasRealizadas, TablaStock, Home, Caja } from "./constants/constants"



function App() {



  return (
    <>
     <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Producto" element={<Producto/>} />
            <Route path="/Ventas" element={<Ventas/>} />
            {/* <Route path="/VentasRealizadas" element={<VentasRealizadas/>} />    */}
            <Route path="/ListadoVentas" element={<ListadoVentas/>} /> 


            <Route path="*" element={ <Navigate to='/' />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
