import React, { useState, useEffect } from 'react'
import { SideBar } from '../components/sideBar';
import axios from 'axios';
export const Resultado = () => {
   const [data, setData]= useState()
   const [equipo, setEquipo] = useState()
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
  const obtenerIdEquipo=(idEquipo)=>{
      
  useEffect(() => {
    const obtenerEquipo = async () => {
      const response = await axios.get(`http://localhost:4000/equipo/obtenerEquipo${idEquipo}`,{
        headers: {
          Idcampeonato: IdCampeonato
        }
      });
       setData(response.data);
      
    };
    obtenerUsuarios();
  }, [])}
  console.log(data)
  return (
    <article className='participantes'> 
      <SideBar/>
    <div>

  {
    data && data.equipos.map((equipo)=>(  
      <article key={equipo._id} className='equiposIncritos'>
        <h1>{equipo.equipo1.name} VS {equipo.equipo2.name}</h1>

      </article>
    ))
  }
   
  </div>
  </article>
  )
}
