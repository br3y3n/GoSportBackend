import React, { useState, useEffect } from 'react'
import { SideBar } from '../components/sideBar';
import axios from 'axios';
import ListaJugadores from '../components/listasJugadores'
import { Link } from 'react-router-dom';
export const Resultado = () => {
   const [data, setData]= useState()
  const [equipo, setEquipo] =useState()
   const idFase= localStorage.getItem('IdFase');
   const IdCampeonato = localStorage.getItem('ID')
   useEffect(() => {
    const obtenerUsuarios = async () => {
      const response = await axios.get(`http://localhost:4000/enfrentamiento/obtenervs`,{
        headers: {
          IdFase: idFase
        }
      });
       setData(response.data);
      
    };
    obtenerUsuarios();
  }, []);

  console.log(data)
 
  return (
    <article className='participantes'> 
      <SideBar/>
    <div className='estadistica'>

  {
    data && data.equipos.map((equipo)=>(  
      <article key={equipo._id} className='equiposIncritos'>
        <div>
        <div onClick={()=>setEquipo(1)}>{equipo.equipo1.name}
        </div>  
        <h1 onClick={()=>setEquipo(2)}>{equipo.equipo2.name}</h1>
        </div>
      <Link to='/mirarResultado'>Mirar Resultados</Link><br />
      <Link to={`/agregarResultado/${equipo._id}`}>Agregar Resultado</Link>
      </article>
    ))
  }
   
  </div>
  {/* <ListaJugadores numeroEquipo={equipo} /> */}
  </article>
  )
}
