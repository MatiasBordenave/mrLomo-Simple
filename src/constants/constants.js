//  Routes  //


export const PRODUCTO_GET = 'http://localhost:5000/productos/'
export const PRODUCTO_POST = 'http://localhost:5000/productos/'


export const TOTAL_GET_SUMA = 'http://localhost:8000/contar/suma/'
export const FACTURA_GET_NUM = 'http://localhost:5000/venta'


export const DETALLEVENTA_POST = 'http://localhost:5000/detalleVenta/'
export const DETALLEVENTA_DELETE = 'http://localhost:8000/detalleVenta/borrar/'
export const DETALLEVENTA_DELETE_ALL = 'http://localhost:8000/detalleVenta/borrarDetalle/'
export const DETALLEVENTA_GET_VENTA = 'http://localhost:5000/detalleVenta/'

export const VENTA_GET_JOIN = 'http://localhost:8000/venta/joinVentas'
export const VENTA_POST = 'http://localhost:8000/venta/registrar'
export const VENTA_POST_JOIN = 'http://localhost:8000/venta/joinVentasFiltradas'

export const STOCK_GET = 'http://localhost:8000/stock'

//   Helper   // 

export { formatearFecha } from '../helpers/formatearFecha'
export { formatearFechaActual } from '../helpers/formatearFecha'

//  Pages  //

export { Ventas } from  '../pages/Ventas/Ventas'
export { Producto } from  '../pages/Producto/Producto'
export { ListadoVentas } from  '../pages/Factura/ListadoVentas'
export { DetalleVenta } from  '../pages/Factura/DetalleVenta'
export { TablaStock } from  '../pages/Stock/TablaStock'
export { Caja } from  '../pages/Caja/Caja'

//  Components  //

export { TablaProducto } from  '../componentes/Productos/TablaProducto'
export { TablaUnProducto } from  '../componentes/Productos/TablaUnProducto'
export { VentasRealizadas } from  '../componentes/Ventas/VentasRealizadas'
export { NavPrincipal } from  '../componentes/NavPrincipal/NavPrincipal'
export { Footer } from  '../componentes/NavPrincipal/Footer'
export { Home } from  '../componentes/NavPrincipal/Home'
export { ModalTicket } from  '../componentes/Ventas/ModalTicket'

