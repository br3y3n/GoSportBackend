import React, { useState, useEffect } from 'react'
import { SideBar } from '../components/sideBar';
import axios from 'axios';
import ListaJugadores from '../components/listasJugadores'
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

console.log(equipo)
 
  return (
    <article className='participantes'> 
      <SideBar/>
    <div>

  {
    data && data.equipos.map((equipo)=>(  
      <article key={equipo._id} className='equiposIncritos'>
        <div>
        <h1 onClick={()=>setEquipo(1)}>{equipo.equipo1.name}</h1>  
        <h1 onClick={()=>setEquipo(2)}>{equipo.equipo2.name}</h1>
        </div>
      </article>
    ))
  }
   
  </div>
  <ListaJugadores numeroEquipo={equipo} />
  </article>
  )
}
