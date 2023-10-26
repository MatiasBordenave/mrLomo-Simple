
import { Link } from 'react-router-dom';
import '../../styles/navPstyle.css';

export  function NavPrincipal(){

 

    function Click(name){

        const venta = document.querySelector(".DisplayVenta");
        const factura = document.querySelector(".DisplayFactura");
        const stock = document.querySelector(".DisplayStock");
        const producto = document.querySelector(".DisplayProducto");

        venta.classList.remove("DisplayVentaActive");
        factura.classList.remove("DisplayFacturaActive");
        stock.classList.remove("DisplayStockActive");
        producto.classList.remove("DisplayProductoActive");

        if(name == "venta"){
            venta.classList.toggle("DisplayVentaActive")
        } else if (name == "facturas"){
                factura.classList.toggle("DisplayFacturaActive")
            }else if (name == "stock"){
                    stock.classList.toggle("DisplayStockActive")
                }else if (name == "productos"){
                    producto.classList.toggle("DisplayProductoActive")
                }
    }


    return(
        <>
            <nav className='nav row col-xs-12'>
            <ul>
                <li><a href="#" onClick={()=>{Click('venta')}}>VENTAS</a></li>
                <li><a href="#" onClick={()=>{Click('facturas')}}>FACTURAS</a></li>
                <li><a href="#" onClick={()=>{Click('stock')}}>STOCK</a></li>
                <li><a href="#" onClick={()=>{Click('productos')}}>PRODUCTOS</a></li>
            </ul>
            </nav> 

            <span className='DisplayVenta'>
                <ul>
                    <li><Link to="/Ventas">Nueva Venta</Link></li>
                    <li><Link to="/VentasRealizadas">Ventas Realizadas</Link></li>
                </ul>
            </span>

            <span className='DisplayFactura'>
                <ul>
                    <li><Link to="/ListadoVentas">Facturas Realizadas</Link></li>
                </ul>
            </span>

            <span className='DisplayStock'>
                <ul>
                    <li><Link to="/TablaStock">Stock Disponible</Link></li>
                    
                </ul>
            </span>

            <span className='DisplayProducto'>
                <ul>
                    <li><Link to="/Producto">Lista de Productos</Link></li>
                </ul>
            </span>
        </>
        
    )
}
export default NavPrincipal;