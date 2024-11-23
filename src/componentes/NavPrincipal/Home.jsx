
import NavPrincipal from './NavPrincipal'
import '../../styles/homestyle.css'
import Footer from './Footer'

export function Home(){
    
    return(
        <div>
            <NavPrincipal/>
            <div className="banner">
                <br />
                <p>
                    <strong>Esta es una demo de la web realizada.</strong> 
                    
                    <br />
                    <br />
                    <br />
                    Esta aplicación está deployada únicamente con fines demostrativos, ya que para su funcionamiento completo es necesario subir el backend y la base de datos, lo cual puede ser complicado debido a la falta de servicios gratuitos confiables y de larga duración.
                    <br />
                    Esta web fue creada como parte de un proyecto universitario para un restaurante de comidas rápidas. Su objetivo es gestionar ventas, historial de ventas, productos, caja, y analizar información como los productos más vendidos, ventas diarias, entre otros.
                </p>
            </div>
            <Footer/>
        </div>
    )
}
export default Home