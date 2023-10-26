import React from 'react'
import { Link } from "react-router-dom"
import '../styles/ventas.css';

export function Nav() {
  return (
    <div>
      <nav className='glass'>
        <Link to="/venta">
            <button>Venta</button>
        </Link>
        <Link to="/VentaRealizada">
          <button> Ventas Realizadas </button>
        </Link>
        <Link to="/">
          <button> Productos </button>
        </Link>
      </nav>
    </div>
  )
}

export default Nav
