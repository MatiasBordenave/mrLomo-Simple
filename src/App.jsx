import {BrowserRouter, Routes, Route} from "react-router-dom"


import {  Producto, Ventas, ListadoVentas, VentasRealizadas, TablaStock, MainStockDisponible, Home } from "./constants/constants"


function App() {


  return (
    <>
     <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Producto" element={<Producto/>} />
            <Route path="/Ventas" element={<Ventas/>} />
            <Route path="/VentasRealizadas" element={<VentasRealizadas/>} />   
            <Route path="/ListadoVentas" element={<ListadoVentas/>} /> 
            <Route path="/TablaStock" element={<TablaStock/>} /> 
            <Route path="/MainStockDisponible" element={<MainStockDisponible/>} /> 
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
