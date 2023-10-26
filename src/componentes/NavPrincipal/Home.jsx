
import logomrlomo from '../../assets/logo-mr-lomo.png'
import NavPrincipal from './NavPrincipal'
import '../../styles/homestyle.css'

export function Home(){
    
    return(
        <div>
            <NavPrincipal/>
            <img className='logoLomo' src={logomrlomo} alt="logo"/>
        </div>
    )
}
export default Home