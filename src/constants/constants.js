//  Routes  //


export const PRODUCTO_GET = 'http://localhost:8000/productos/'
export const PRODUCTO_POST = 'http://localhost:8000/productos/registrar'

export const TOTAL_GET_SUMA = 'http://localhost:8000/contar/suma/'
export const FACTURA_GET_NUM = 'http://localhost:8000/contar'

export const CATEGORIA_GET = 'http://localhost:8000/categoria/'
export const CATEGORIA_POST = 'http://localhost:8000/categoria/registrar'

export const DETALLEVENTA_POST = 'http://localhost:8000/detalleVenta/registrar'
export const DETALLEVENTA_DELETE = 'http://localhost:8000/detalleVenta/borrar/'
export const DETALLEVENTA_DELETE_ALL = 'http://localhost:8000/detalleVenta/borrarDetalle/'
export const DETALLEVENTA_GET_VENTA = 'http://localhost:8000/detalleVenta/venta/'

export const VENTA_POST = 'http://localhost:8000/venta/registrar'
export const VENTA_GET_JOIN = 'http://localhost:8000/venta/joinVentas'

export const INGREDIENTES_GET = 'http://localhost:8000/ingredientes/'
export const INGREDIENTES_GET_CRUZE = 'http://localhost:8000/ingredientes/prodEIngrediente'
export const INGREDIENTES_POST = 'http://localhost:8000/ingredientes/registrar'

//  Pages  //

export { Ventas } from  '../pages/Ventas/Ventas'
export { Producto } from  '../pages/Producto/Producto'
export { ListadoVentas } from  '../pages/Factura/ListadoVentas'
export { DetalleVenta } from  '../pages/Factura/DetalleVenta'
export { TablaStock } from  '../pages/Stock/TablaStock'
export { MainStockDisponible } from  '../pages/Stock/MainStockDisponible'


//  Components  //

export { Categoria } from  '../componentes/Productos/Categoria'
export { Nav } from  '../componentes/Nav'
export { TablaProducto } from  '../componentes/Productos/TablaProducto'
export { TablaUnProducto } from  '../componentes/Productos/TablaUnProducto'
export { VentasRealizadas } from  '../componentes/Ventas/VentasRealizadas'
export { NavPrincipal } from  '../componentes/NavPrincipal/NavPrincipal'
export { Home } from  '../componentes/NavPrincipal/Home'

