import React from 'react'
import { Link } from 'react-router-dom'
import './sideCss.css'
export const SideBar = () => {

  const IdCampeonato = localStorage.getItem('ID');
  return (
   
    <ul className="listaCam">
      <li className="contenedorAsideCam">
        
        <Link to={`/mirarparticipantes/${IdCampeonato}`} className="li">
          participantes
        </Link>
      </li>

      <li className="contenedorAsideCam">
        <Link to={`/cronograma`} className="li">
          Cronograma
        </Link>
      </li>

      <li className="contenedorAsideCam">
        <Link to={`/derrotero`} className="li">
          Derrotero
        </Link>
      </li>

      <li className={`contenedorAsideCam `}>
        <Link to={`/resultado`} className="li">
          Estadisticas
        </Link>
      </li>
    </ul>
  )
}
