import React,{useState, useEffect} from 'react'
import { SideBar } from '../components/sideBar'
import './participanteCss.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
export const Participantes = () => {
    const IdCampeonato = useParams().idCampeonato
    localStorage.setItem('ID', IdCampeonato.toString())
    const [data, setData] = useState()
    useEffect(() => {
        const obtenerUsuarios = async () => {
          const response = await axios.get(`http://localhost:4000/enfrentamiento/vs`,{
            headers:{
              Authorization: IdCampeonato
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
        <section className='listadoParticipantes'>
        
        { data &&
        data.ganadores.map((equipo) => (
          <article className='integrante' key={equipo._id}>
            <h1>nombre equipo: {equipo.nombreEquipo}</h1>
            <h1>nombre capitan: {equipo.nombreCapitan}</h1>
          </article>
        ))}
        
        </section>
    </article>
  )
}
